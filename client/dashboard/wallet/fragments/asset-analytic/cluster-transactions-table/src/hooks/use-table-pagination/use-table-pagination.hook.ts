import type { PaginationState }          from '@tanstack/react-table'

import type { UseTablePaginationReturn } from './use-table-pagination.interfaces.js'

import { useState }                      from 'react'

export const useTablePagination = (initial: PaginationState): UseTablePaginationReturn => {
  const [pagination, setPagination] = useState<PaginationState>(initial)

  const resetPagination = (): void => {
    setPagination(initial)
  }

  return { pagination, setPagination, resetPagination }
}
