import type { ReactNode }             from 'react'

import type { ClustersRawTableProps } from '../clusters-raw-table.interfaces.js'

import { useTranslations }            from 'next-intl'

import { CopyButton }                 from '@shared/buttons'

export const ClustersRawTableCopy = ({ table, isFetching }: ClustersRawTableProps): ReactNode => {
  const t = useTranslations('clusters-table')

  const pageData = table.getRowModel().rows.map((row) => row.original)

  return (
    <CopyButton size='medium' loading={isFetching} copyText={JSON.stringify(pageData, null, 2)}>
      {t('copy')}
    </CopyButton>
  )
}
