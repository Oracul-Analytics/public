import type { Cluster }             from '@shared/data'
import type { Table }               from '@tanstack/react-table'

import type { TableClustersStatus } from '../hooks/index.js'

export interface ClustersTitleProps {
  status: TableClustersStatus
  table: Table<Cluster>
}
