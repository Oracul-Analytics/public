import type { Cluster }         from '@shared/data'
import type { PaginationState } from '@tanstack/react-table'
import type { SortingState }    from '@tanstack/react-table'

export type TableClustersStatus = 'empty' | 'error' | 'skeleton' | 'success'

export interface UseTableClustersProps {
  pagination: PaginationState
  sorting: SortingState
}

export interface UseTableClustersReturn {
  status: TableClustersStatus
  clusters: Array<Cluster>
  clustersCount: number
}
