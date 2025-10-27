import type { Cluster } from '@shared/data'
import type { Row }     from '@tanstack/react-table'

export interface ClustersRawTableRowProps {
  row: Row<Cluster>
  isFetching: boolean
}
