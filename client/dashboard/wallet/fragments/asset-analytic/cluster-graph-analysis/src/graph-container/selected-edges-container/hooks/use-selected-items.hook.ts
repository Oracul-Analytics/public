import type { UseSelectedItemsReturn } from './use-selected-items.interfaces.js'
import type { UseSelectedItemsProps }  from './use-selected-items.interfaces.js'

import { useTranslations }             from 'next-intl'

import { shortenNumber }               from '@shared/utils'
import { truncateAddress }             from '@shared/utils'

export const useSelectedItems = ({ edges = [] }: UseSelectedItemsProps): UseSelectedItemsReturn => {
  const t = useTranslations('cluster-graph-analysis.edge')

  const items = edges.map((edge) => ({
    id: edge.unix,
    title: `${truncateAddress(edge.sourceAddress)}-${truncateAddress(edge.targetAddress)}`,
    stats: [
      { text: t('transactions'), value: shortenNumber(edge.transactionCount) },
      { text: t('tokens'), value: shortenNumber(edge.transactionWeight) },
      { text: t('amount'), value: `${shortenNumber(edge.usdWeight)} ${t('usd')}` },
    ],
  }))

  return { items }
}
