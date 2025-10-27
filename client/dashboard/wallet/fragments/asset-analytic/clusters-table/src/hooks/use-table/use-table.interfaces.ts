import type { Cluster }             from '@shared/data'
import type { Table }               from '@tanstack/react-table'

import type { TableClustersStatus } from '../use-table-clusters/index.js'

export interface UseTableReturn {
  table: Table<Cluster>
  status: TableClustersStatus
}
