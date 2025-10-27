import type { Link }                    from '@shared/data'
import type { Table }                   from '@tanstack/react-table'

import type { TableTransactionsStatus } from '../use-table-transactions/index.js'

export interface UseTableReturn {
  table: Table<Link>
  status: TableTransactionsStatus
}
