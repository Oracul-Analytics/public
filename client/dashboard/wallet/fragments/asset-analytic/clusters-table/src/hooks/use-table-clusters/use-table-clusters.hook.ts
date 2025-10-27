import type { UseTableClustersProps }  from './use-table-clusters.interfaces.js'
import type { UseTableClustersReturn } from './use-table-clusters.interfaces.js'

import { useQueryState }               from 'nuqs'

import { useClusters }                 from '@shared/data'
import { sortPrimitiveRecordArray }    from '@shared/utils'
import { paginateArray }               from '@shared/utils'

import { transformSorting }            from '../use-table-sorting/index.js'
import { emptyData }                   from './use-table-clusters.constants.js'
import { skeletonData }                from './use-table-clusters.constants.js'

// TODO: switch to server-side pagination and sorting once the backend is implemented
export const useTableClusters = ({
  pagination,
  sorting,
}: UseTableClustersProps): UseTableClustersReturn => {
  const [tokenAddress] = useQueryState('tokenAddress', { defaultValue: '' })
  const [searchWallet] = useQueryState('searchWallet')

  const { data, isFetching, isError } = useClusters({
    args: {
      tokenAddress,
      searchWallet: searchWallet || undefined,
    },
  })

  const isSkeleton = isFetching && !data?.clusters?.length

  if (isSkeleton) {
    return {
      status: 'skeleton',
      clusters: skeletonData,
      clustersCount: skeletonData.length,
    }
  }

  if (isError || !data?.clusters?.length) {
    return {
      status: isError ? 'error' : 'empty',
      clusters: emptyData,
      clustersCount: emptyData.length,
    }
  }

  let { clusters } = data

  if (sorting.at(0)) {
    clusters = sortPrimitiveRecordArray(clusters, transformSorting(sorting[0]))
  }

  const paginatedClusters = paginateArray(clusters, pagination.pageIndex, pagination.pageSize)

  return {
    status: 'success',
    clusters: paginatedClusters,
    clustersCount: clusters.length,
  }
}
