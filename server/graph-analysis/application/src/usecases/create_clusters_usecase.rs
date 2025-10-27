use async_trait::async_trait;
use domain::cache::link::LinkCacheAbstract;
use domain::cache::transfer::TransferCacheFactory;
use domain::cache::{cluster::ClusterCacheAbstract, node::NodeCacheAbstract};
use domain::constants::channel::CHANNEL_BUFFER_SIZE;
use domain::entities::cluster::Cluster;
use domain::entities::transfer::Transfer;
use domain::errors::usecase::UsecaseError;
use domain::impls::graph::{create_graph, get_clusters};
use domain::repositories::coin::CoinRepositoryAbstract;
use domain::usecases::create_clusters_usecase::CreateClustersUsecaseAbstract;
use domain::value_objects::graph::Graph;
use domain::value_objects::token_address::TokenAddress;
use domain::value_objects::wallet_address::WalletAddress;
use futures::{Stream, try_join};
use rayon::iter::IntoParallelRefIterator;
use rayon::iter::ParallelIterator;
use std::marker::PhantomData;
use std::pin::Pin;
use std::sync::Arc;
use tokio::sync::mpsc::error::SendError;
use tokio::sync::mpsc::{self};
use tokio::task;
use tracing::{debug, error, info, warn};

use crate::guards::cache_cleanup::CacheCleanupGuard;

pub struct CreateClustersUsecase<CoinRepo, CacheFactory, ClusterCache, NodeCache, LinkCache>
where
    CoinRepo: CoinRepositoryAbstract,
    CacheFactory: TransferCacheFactory,
    ClusterCache: ClusterCacheAbstract + 'static,
    NodeCache: NodeCacheAbstract + 'static,
    LinkCache: LinkCacheAbstract + 'static,
{
    coin_repo: Arc<CoinRepo>,
    cluster_cache: Arc<ClusterCache>,
    node_cache: Arc<NodeCache>,
    link_cache: Arc<LinkCache>,
    _store_factory: PhantomData<CacheFactory>,
}

impl<CoinRepo, CacheFactory, ClusterCache, NodeCache, LinkCache>
    CreateClustersUsecase<CoinRepo, CacheFactory, ClusterCache, NodeCache, LinkCache>
where
    CoinRepo: CoinRepositoryAbstract,
    CacheFactory: TransferCacheFactory,
    ClusterCache: ClusterCacheAbstract,
    NodeCache: NodeCacheAbstract,
    LinkCache: LinkCacheAbstract,
{
    pub fn new(
        coin_repo: Arc<CoinRepo>,
        cluster_cache: Arc<ClusterCache>,
        node_cache: Arc<NodeCache>,
        link_cache: Arc<LinkCache>,
    ) -> Self {
        Self {
            coin_repo,
            cluster_cache,
            node_cache,
            link_cache,
            _store_factory: PhantomData,
        }
    }
}

#[async_trait]
impl<CoinRepo, CacheFactory, ClusterCache, NodeCache, LinkCache> CreateClustersUsecaseAbstract
    for CreateClustersUsecase<CoinRepo, CacheFactory, ClusterCache, NodeCache, LinkCache>
where
    CoinRepo: CoinRepositoryAbstract,
    CacheFactory: TransferCacheFactory,
    ClusterCache: ClusterCacheAbstract,
    NodeCache: NodeCacheAbstract,
    LinkCache: LinkCacheAbstract,
{
    async fn execute(
        &self,
        token_address: &TokenAddress,
        wallet_address: Option<WalletAddress>,
    ) -> Result<Pin<Box<dyn Stream<Item = Result<Graph, UsecaseError>> + Send>>, UsecaseError> {
        let mut transfers = self
            .coin_repo
            .get_transfers_by_token_address(token_address)
            .await?;

        info!("Fetched {} transfers", transfers.len());

        let token_rates = self.coin_repo.get_token_rates(token_address).await?;
        let ticker = self
            .coin_repo
            .get_ticker_by_token_address(token_address)
            .await?;

        let current_rate = if let Some(rate) = token_rates.iter().max_by_key(|r| r.unix) {
            rate.token_rate
        } else {
            return Err(UsecaseError::RateUpdating);
        };

        Transfer::update_transfers_with_rates(&mut transfers, token_rates)?;

        let (tx, mut rx) = mpsc::channel(CHANNEL_BUFFER_SIZE);
        let token_address_clone = token_address.clone();

        debug!("Generate clusters for token: {:?}", token_address);

        let wallet_address_clone = wallet_address.clone();

        tokio::task::spawn_blocking(move || {
            let graph = create_graph(&transfers);
            let transfer_cache = Arc::new(CacheFactory::create_cache(&transfers));
            let mut graph_clusters = get_clusters(&graph);

            if let Some(search_wallet) = wallet_address.as_ref() {
                graph_clusters =
                    Cluster::get_clusters_by_wallet(&graph_clusters, &graph, search_wallet);
            }

            let result = graph_clusters.par_iter().try_for_each_with(
                tx,
                |tx, cluster| -> Result<(), SendError<Graph>> {
                    let graph = Cluster::create_cluster(
                        cluster,
                        &graph,
                        current_rate,
                        transfer_cache.clone(),
                        ticker.clone(),
                        &token_address_clone,
                    );

                    if let Some(graph) = graph {
                        tx.blocking_send(graph)?;
                    }
                    Ok(())
                },
            );

            if let Err(e) = result {
                warn!("Channel closed, stopping graph creation: {}", e);
            }
        });

        let (cache_tx, mut cache_rx) = mpsc::channel::<Graph>(CHANNEL_BUFFER_SIZE);
        let cluster_cache_for_task = self.cluster_cache.clone();
        let cluster_cache = self.cluster_cache.clone();
        let node_cache = self.node_cache.clone();
        let link_cache = self.link_cache.clone();
        let token_address_clone_for_cleanup = token_address.clone();

        task::spawn(async move {
            while let Some(graph) = cache_rx.recv().await {
                if let Err(e) = try_join!(
                    cluster_cache_for_task.cache_cluster(&graph.cluster),
                    node_cache.cache_nodes(&graph.nodes),
                    link_cache.cache_links(&graph.links)
                ) {
                    error!("Cache error: {}", e);
                    return;
                }
            }
        });

        let stream = async_stream::try_stream! {
            let mut cleanup_guard = CacheCleanupGuard::new(cluster_cache.clone(), token_address_clone_for_cleanup.clone());
            let mut should_cleanup = false;

            while let Some(graph) = rx.recv().await {
                if wallet_address_clone.is_none() {
                    if let Err(e) = cache_tx.send(graph.clone()).await {
                        should_cleanup = true;
                        warn!("Channel closed, stopping graph caching: {}", e);
                    }
                }
                yield graph;
            }

            if !should_cleanup {
                cleanup_guard.disarm();
            }
        };

        Ok(Box::pin(stream))
    }
}
