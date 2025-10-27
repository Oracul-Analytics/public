import type { Link }       from '@shared/data'
import type { MultiGraph } from 'graphology'

import type { GraphColor } from '../../use-graph-colors/index.js'

import { EDGE_SIZE }       from './create-sigma-instance/index.js'
import { getEdgeId }       from './get-edge-id.util.js'

export const addEdgeToGraph = (link: Link, attrs: GraphColor, graph: MultiGraph): void => {
  const edgeId = getEdgeId(link)

  if (graph.hasEdge(edgeId)) {
    graph.updateEdgeAttributes(edgeId, (prev) => ({
      ...prev,
      ...attrs,
      link: {
        ...link,
        transactionCount: (prev.link?.transactionCount ?? 0) + 1,
        transactionWeight: prev.link.transactionWeight + link.transactionWeight,
        usdWeight: prev.link.usdWeight + link.usdWeight,
      },
    }))

    return
  }

  if (graph.hasNode(link.sourceId) && graph.hasNode(link.targetId)) {
    graph.addEdgeWithKey(edgeId, link.sourceId, link.targetId, {
      size: EDGE_SIZE,
      ...attrs,
      link: { ...link, transactionCount: 1 },
    })
  }
}
