import type { SortingState }   from '@tanstack/react-table'
import type { Updater }        from '@tanstack/react-table'

import type { UseTableReturn } from './use-table.interfaces.js'

import { useReactTable }       from '@tanstack/react-table'
import { getCoreRowModel }     from '@tanstack/react-table'

import { initialPagination }   from '../use-table-clusters/index.js'
import { useTableClusters }    from '../use-table-clusters/index.js'
import { useTablePagination }  from '../use-table-pagination/index.js'
import { useTableSorting }     from '../use-table-sorting/index.js'
import { columnsConfig }       from './use-table.configs.js'

export const useTable = (): UseTableReturn => {
  const { pagination, setPagination, resetPagination } = useTablePagination(initialPagination)
  const { sorting, setSorting } = useTableSorting()

  const { clusters, clustersCount, status } = useTableClusters({ pagination, sorting })

  const handleSortingChange = (updater: Updater<SortingState>): void => {
    resetPagination()
    setSorting(updater)
  }

  const table = useReactTable({
    data: clusters,
    columns: columnsConfig,
    rowCount: clustersCount,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: handleSortingChange,
    onPaginationChange: setPagination,
    manualPagination: true,
    manualSorting: true,
    autoResetPageIndex: false,
    state: {
      pagination: status === 'skeleton' ? initialPagination : pagination,
      sorting,
    },
  })

  return {
    status,
    table: { ...table },
  }
}
