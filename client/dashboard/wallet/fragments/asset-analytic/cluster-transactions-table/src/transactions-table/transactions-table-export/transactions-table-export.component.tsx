import type { ReactNode }              from 'react'

import type { TransactionsTableProps } from '../transactions-table.interfaces.js'

import { useTranslations }             from 'next-intl'
import { useQueryState }               from 'nuqs'

import { ExportButton }                from '@shared/buttons'

export const TransactionsTableExport = ({
  table,
  isFetching,
}: TransactionsTableProps): ReactNode => {
  const t = useTranslations('cluster-transactions-table')
  const [tokenAddress] = useQueryState('tokenAddress', { defaultValue: '' })

  const allData = table.getCoreRowModel().rows.map((row) => row.original)

  return (
    <ExportButton
      size='medium'
      fileName={`cluster-links-${tokenAddress}`}
      loading={isFetching}
      exportValue={allData}
    >
      {t('download')}
    </ExportButton>
  )
}
