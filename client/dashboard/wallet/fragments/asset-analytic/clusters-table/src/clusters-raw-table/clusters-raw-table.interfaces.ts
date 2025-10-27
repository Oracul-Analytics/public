import type { Cluster } from '@shared/data'
import type { Table }   from '@tanstack/react-table'

export interface ClustersRawTableProps {
  table: Table<Cluster>
  isFetching: boolean
}
