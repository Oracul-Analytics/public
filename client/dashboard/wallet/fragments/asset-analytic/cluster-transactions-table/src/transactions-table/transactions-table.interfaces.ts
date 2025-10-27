import type { Link }  from '@shared/data'
import type { Table } from '@tanstack/react-table'

export interface TransactionsTableProps {
  table: Table<Link>
  isFetching: boolean
}
