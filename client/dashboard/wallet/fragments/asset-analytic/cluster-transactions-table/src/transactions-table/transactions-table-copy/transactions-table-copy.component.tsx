import type { ReactNode }              from 'react'

import type { TransactionsTableProps } from '../transactions-table.interfaces.js'

import { useTranslations }             from 'next-intl'

import { CopyButton }                  from '@shared/buttons'

export const TransactionsTableCopy = ({ table, isFetching }: TransactionsTableProps): ReactNode => {
  const t = useTranslations('cluster-transactions-table')

  const pageData = table.getRowModel().rows.map((row) => row.original)

  return (
    <CopyButton size='medium' loading={isFetching} copyText={JSON.stringify(pageData, null, 2)}>
      {t('copy')}
    </CopyButton>
  )
}
