import type { SortingState }          from '@tanstack/react-table'
import type { Updater }               from '@tanstack/react-table'

import type { UseTableSortingReturn } from './use-table-sorting.interfaces.js'

import { useQueryState }              from 'nuqs'

import { parseAsSortingState }        from './use-table-sorting.constants.js'

export const useTableSorting = (): UseTableSortingReturn => {
  const [sorting, setSorting] = useQueryState('sort', parseAsSortingState)

  const changeSorting = (updater: Updater<SortingState>): void => {
    setSorting(updater)
  }

  return { sorting, setSorting: changeSorting }
}
