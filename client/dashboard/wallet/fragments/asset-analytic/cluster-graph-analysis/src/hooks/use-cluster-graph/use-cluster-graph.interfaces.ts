import type { Link }            from '@shared/data'
import type { Node }            from '@shared/data'
import type { SerializedGraph } from 'graphology-types'
import type { RefObject }       from 'react'

import type { SelectedEdge }    from '../../graph-container/index.js'
import type { GraphColor }      from '../use-graph-colors/index.js'

export enum EdgeType {
  DEFAULT = 'edges-default',
  FAST = 'edges-fast',
}

export interface BuildGraphMessage {
  nodes: Array<{ node: Node; attrs: GraphColor }>
  edges: Array<{ link: Link; attrs: GraphColor }>
}

export interface BuildGraphMessageReturn {
  data: SerializedGraph
}

export interface UseClusterGraphReturn {
  selectedNode?: Node
  selectedEdges?: Array<SelectedEdge>
  graphContainer: RefObject<HTMLDivElement | null>
  isPlayed: boolean
  toggleFA2Layout: () => void
  handleChangeEdgeType: (active: boolean) => void
  handleChangeLinLogMode: (active: boolean) => void
  updateGraph: (nodes: Array<Node>, edges: Array<Link>) => void
}
