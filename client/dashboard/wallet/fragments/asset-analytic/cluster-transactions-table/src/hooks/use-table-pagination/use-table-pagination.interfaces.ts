import type { PaginationState } from '@tanstack/react-table'
import type { Dispatch }        from 'react'
import type { SetStateAction }  from 'react'

export interface UseTablePaginationReturn {
  pagination: PaginationState
  setPagination: Dispatch<SetStateAction<PaginationState>>
  resetPagination: () => void
}
