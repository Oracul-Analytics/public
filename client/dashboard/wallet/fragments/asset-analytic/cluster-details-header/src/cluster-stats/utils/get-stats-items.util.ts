import type { GetStatsItemsProps }  from './get-stats-items.interfaces.js'
import type { GetStatsItemsReturn } from './get-stats-items.interfaces.js'
import type { StatsItem }           from './get-stats-items.interfaces.js'

import { shortenNumber }            from '@shared/utils'

export const getStatsItems = ({ cluster }: GetStatsItemsProps): GetStatsItemsReturn => {
  const statsItems: Array<StatsItem> = [
    {
      id: 'realized-pnl',
      value: shortenNumber(cluster?.realizedPnl),
      title: cluster?.realizedPnl?.toLocaleString(),
    },
    {
      id: 'unrealized-pnl',
      value: shortenNumber(cluster?.unrealizedPnl),
      title: cluster?.unrealizedPnl?.toLocaleString(),
    },
    {
      id: 'total-pnl',
      value: shortenNumber(cluster?.totalPnl),
      title: cluster?.totalPnl?.toLocaleString(),
    },
    {
      id: 'average-price-dex',
      buy: cluster?.weightedAverageDexBuyPrice
        ? `${shortenNumber(cluster?.weightedAverageDexBuyPrice)} $`
        : '–',
      sell: cluster?.weightedAverageDexSellPrice
        ? `${shortenNumber(cluster?.weightedAverageDexSellPrice)} $`
        : '–',
    },
    {
      id: 'average-price-cex',
      buy: cluster?.weightedAverageCexBuyPrice
        ? `${shortenNumber(cluster?.weightedAverageCexBuyPrice)} $`
        : '–',
      sell: cluster?.weightedAverageCexSellPrice
        ? `${shortenNumber(cluster?.weightedAverageCexSellPrice)} $`
        : '–',
    },
  ]

  return { statsItems }
}
