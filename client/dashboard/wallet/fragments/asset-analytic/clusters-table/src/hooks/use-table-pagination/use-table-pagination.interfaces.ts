import type { PaginationState } from '@tanstack/react-table'
import type { OnChangeFn }      from '@tanstack/react-table'

export interface UseTablePaginationReturn {
  pagination: PaginationState
  setPagination: OnChangeFn<PaginationState>
  resetPagination: () => void
}
