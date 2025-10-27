import type { MultiGraph } from 'graphology'
import type { RefObject }  from 'react'

import type { EdgeType }   from '../../use-cluster-graph.interfaces.js'

export interface CreateSigmaInstanceProps {
  graph: MultiGraph
  container: HTMLElement
  edgeType: RefObject<EdgeType | null>
  focusedNodes: RefObject<Array<string>>
}
