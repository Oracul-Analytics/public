import type { Node }       from '@shared/data'
import type { MultiGraph } from 'graphology'

import type { GraphColor } from '../../use-graph-colors/index.js'

import { NODE_SIZE }       from './create-sigma-instance/index.js'

export const addNodeToGraph = (node: Node, attrs: GraphColor, graph: MultiGraph): void => {
  if (!graph.hasNode(node.id)) {
    graph.addNode(node.id, { size: NODE_SIZE, ...attrs, node })
    return
  }

  graph.updateNodeAttributes(node.id, (prev) => ({ ...prev, ...attrs, node }))
}
