import type { Link }               from '@shared/data'
import type { ColumnFiltersState } from '@tanstack/react-table'
import type { PaginationState }    from '@tanstack/react-table'
import type { SortingState }       from '@tanstack/react-table'

export type TableTransactionsStatus = 'empty' | 'error' | 'skeleton' | 'success'

export interface UseTableTransactionsProps {
  pagination: PaginationState
  sorting: SortingState
  filters: ColumnFiltersState
}

export interface UseTableTransactionsReturn {
  status: TableTransactionsStatus
  transactions: Array<Link>
  transactionsCount: number
}
