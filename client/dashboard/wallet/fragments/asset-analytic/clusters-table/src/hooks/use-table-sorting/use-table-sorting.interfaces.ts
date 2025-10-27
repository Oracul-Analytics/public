import type { SortingState } from '@tanstack/react-table'
import type { OnChangeFn }   from '@tanstack/react-table'

export interface UseTableSortingReturn {
  sorting: SortingState
  setSorting: OnChangeFn<SortingState>
}
