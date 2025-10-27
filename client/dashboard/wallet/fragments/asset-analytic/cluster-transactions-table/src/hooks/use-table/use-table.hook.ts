import type { ColumnFiltersState } from '@tanstack/react-table'
import type { Updater }            from '@tanstack/react-table'
import type { SortingState }       from '@tanstack/react-table'

import type { UseTableReturn }     from './use-table.interfaces.js'

import { useReactTable }           from '@tanstack/react-table'
import { getCoreRowModel }         from '@tanstack/react-table'
import { useState }                from 'react'

import { useTablePagination }      from '../use-table-pagination/index.js'
import { initialPagination }       from '../use-table-transactions/index.js'
import { useTableTransactions }    from '../use-table-transactions/index.js'
import { columnsConfig }           from './use-table.configs.js'

export const useTable = (): UseTableReturn => {
  const { pagination, setPagination, resetPagination } = useTablePagination(initialPagination)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const { transactions, transactionsCount, status } = useTableTransactions({
    pagination,
    sorting,
    filters: columnFilters,
  })

  const handleSortingChange = (updater: Updater<SortingState>): void => {
    resetPagination()
    setSorting(updater)
  }

  const handleColumnFiltersChange = (updater: Updater<ColumnFiltersState>): void => {
    resetPagination()
    setColumnFilters(updater)
  }

  const table = useReactTable({
    data: transactions,
    columns: columnsConfig,
    rowCount: transactionsCount,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
    onSortingChange: handleSortingChange,
    onPaginationChange: setPagination,
    onColumnFiltersChange: handleColumnFiltersChange,
    state: {
      pagination: status === 'skeleton' ? initialPagination : pagination,
      sorting,
      columnFilters,
    },
  })

  return {
    status,
    table: { ...table },
  }
}
