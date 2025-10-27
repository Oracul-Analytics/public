import type { Cluster }  from '@shared/data'
import type { Messages } from 'next-intl'

export interface StatsItem {
  id: keyof Messages['cluster-details']['stats']
  value?: number | string | null
  buy?: number | string | null
  sell?: number | string | null
  title?: string
  increased?: boolean
}

export interface GetStatsItemsProps {
  cluster?: Cluster
}

export interface GetStatsItemsReturn {
  statsItems: Array<StatsItem>
}
