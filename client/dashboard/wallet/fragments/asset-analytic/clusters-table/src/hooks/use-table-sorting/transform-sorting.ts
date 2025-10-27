import type { Cluster }     from '@shared/data'
import type { SortOptions } from '@shared/utils'
import type { ColumnSort }  from '@tanstack/react-table'

const transformToNumberKeys: Array<keyof Cluster> = [
  'weightedAverageBuyPrice',
  'weightedAverageSellPrice',
  'realizedPnl',
  'unrealizedPnl',
  'totalPnl',
]

export const transformSorting = (sorting: ColumnSort): SortOptions => ({
  key: sorting.id,
  desc: sorting.desc,
  transformToNumberKeys,
})
