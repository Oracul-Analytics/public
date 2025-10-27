import type { PaginationState }          from '@tanstack/react-table'
import type { Updater }                  from '@tanstack/react-table'

import type { UseTablePaginationReturn } from './use-table-pagination.interfaces.js'

import { parseAsIndex }                  from 'nuqs'
import { useQueryStates }                from 'nuqs'
import { parseAsInteger }                from 'nuqs'

export const useTablePagination = (initial: PaginationState): UseTablePaginationReturn => {
  const [pagination, setPagination] = useQueryStates(
    {
      pageIndex: parseAsIndex.withDefault(initial.pageIndex),
      pageSize: parseAsInteger.withDefault(initial.pageSize),
    },
    { urlKeys: { pageIndex: 'page' } }
  )

  const changePagination = (updater: Updater<PaginationState>): void => {
    setPagination(updater)
  }

  const resetPagination = (): void => {
    setPagination(initial)
  }

  return { pagination, setPagination: changePagination, resetPagination }
}
