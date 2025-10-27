import type { BuildGraphMessage } from '../use-cluster-graph.interfaces.js'

import { MultiGraph }             from 'graphology'

import { addEdgeToGraph }         from './index.js'
import { addNodeToGraph }         from './index.js'

// eslint-disable-next-line no-restricted-globals
self.onmessage = ({ data }: MessageEvent<BuildGraphMessage>): void => {
  const graph = new MultiGraph()

  data.nodes.forEach(({ node, attrs }) => {
    addNodeToGraph(node, attrs, graph)
  })

  data.edges.forEach(({ link, attrs }) => {
    addEdgeToGraph(link, attrs, graph)
  })

  postMessage(graph.export())
}
