import type { Node }                    from '@shared/data'
import type { Link }                    from '@shared/data'
import type { Sigma }                   from 'sigma'

import type { SelectedEdge }            from '../../graph-container/index.js'
import type { BuildGraphMessage }       from './use-cluster-graph.interfaces.js'
import type { BuildGraphMessageReturn } from './use-cluster-graph.interfaces.js'
import type { UseClusterGraphReturn }   from './use-cluster-graph.interfaces.js'

import { MultiGraph }                   from 'graphology'
import { random }                       from 'graphology-layout'
import { useEffect }                    from 'react'
import { useState }                     from 'react'
import { useRef }                       from 'react'

import { useClusterDetails }            from '@shared/hooks'

import { LOAD_GRAPH_LAYOUT_TIME_MS }    from './use-cluster-graph.constants.js'
import { EdgeType }                     from './use-cluster-graph.interfaces.js'
import { ClusterGraphModel }            from './use-cluster-graph.model.js'
import { useFocusedWallet }             from '../use-focused-wallet/index.js'
import { useForceAtlas2Layout }         from '../use-force-atlas-2-layout/index.js'
import { useGraphColors }               from '../use-graph-colors/index.js'
import { createSigmaInstance }          from './utils/index.js'

export const useClusterGraph = (): UseClusterGraphReturn => {
  const [selectedNode, setSelectedNode] = useState<Node>()
  const [selectedEdges, setSelectedEdges] = useState<Array<SelectedEdge>>()
  const edgeType = useRef<EdgeType>(null)
  const sigmaInstance = useRef<Sigma>(null)
  const graphContainer = useRef<HTMLDivElement>(null)
  const graphModel = useRef(new ClusterGraphModel())
  const builderWorker = useRef<Worker | null>(null)

  const { focusedNodesRef } = useFocusedWallet()
  const { getEdgeColors, getNodeColors } = useGraphColors()
  const { initFA2Layout, isPlayed, toggleFA2Layout, changeLinLogMode } = useForceAtlas2Layout()
  const { isLoading, nodes, links } = useClusterDetails()

  const handleChangeEdgeType = (active: boolean): void => {
    edgeType.current = active ? EdgeType.FAST : EdgeType.DEFAULT
    sigmaInstance.current?.refresh({ skipIndexation: true })
  }

  const updateGraph = (newNodes: Array<Node>, newEdges: Array<Link>): void => {
    graphModel.current.update(newNodes, newEdges, getNodeColors, getEdgeColors)
    sigmaInstance.current?.refresh()
  }

  useEffect(() => {
    sigmaInstance.current?.refresh({ skipIndexation: true })
  }, [focusedNodesRef.current])

  useEffect(() => {
    if (!nodes.length || !links.length || isLoading || !graphContainer.current) {
      return
    }

    if (!sigmaInstance.current) {
      builderWorker.current = new Worker(
        new URL('./utils/graph-builder.worker.ts', import.meta.url),
        { type: 'module' }
      )

      builderWorker.current.onmessage = ({ data }: BuildGraphMessageReturn): void => {
        const graph = MultiGraph.from(data)
        graphModel.current.setGraph(graph, nodes, links)

        random.assign(graph)

        const sigma = createSigmaInstance({
          graph,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          container: graphContainer.current!,
          edgeType,
          focusedNodes: focusedNodesRef,
        })

        sigma.on('clickNode', ({ node }) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setSelectedNode(graph.getNodeAttribute(node, 'node'))
        })

        sigma.on('clickEdge', ({ edge }) => {
          const newSelectedEdges = [graph.getEdgeAttribute(edge, 'link')]
          const reversedEdge = edge.split('-').reverse().join('-')
          if (graph.hasEdge(reversedEdge)) {
            newSelectedEdges.push(graph.getEdgeAttribute(reversedEdge, 'link'))
          }
          setSelectedEdges(newSelectedEdges)
        })

        sigmaInstance.current = sigma
        initFA2Layout(graph, LOAD_GRAPH_LAYOUT_TIME_MS)
      }

      const message: BuildGraphMessage = {
        nodes: nodes.map((node) => ({ node, attrs: getNodeColors(node) })),
        edges: links.map((link) => ({ link, attrs: getEdgeColors(link) })),
      }

      builderWorker.current.postMessage(message)
    } else {
      updateGraph(nodes, links)
    }
  }, [isLoading])

  useEffect(
    () => (): void => {
      builderWorker.current?.terminate()
      sigmaInstance.current?.kill()
    },
    []
  )

  return {
    selectedNode,
    selectedEdges,
    graphContainer,
    isPlayed,
    toggleFA2Layout,
    handleChangeEdgeType,
    handleChangeLinLogMode: changeLinLogMode,
    updateGraph,
  }
}
