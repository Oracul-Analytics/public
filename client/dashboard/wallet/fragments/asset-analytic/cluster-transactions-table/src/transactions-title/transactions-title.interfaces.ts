import type { Link }                    from '@shared/data'
import type { Table }                   from '@tanstack/react-table'

import type { TableTransactionsStatus } from '../hooks/index.js'

export interface TransactionsTitleProps {
  status: TableTransactionsStatus
  table: Table<Link>
}
