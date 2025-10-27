import type { Link } from '@shared/data'

export interface SelectedEdge extends Link {
  transactionCount: number
}

export interface SelectedEdgesContainerProps {
  edges?: Array<SelectedEdge>
}
