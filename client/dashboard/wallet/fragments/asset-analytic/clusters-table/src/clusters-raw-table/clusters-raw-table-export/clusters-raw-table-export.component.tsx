import type { ReactNode }             from 'react'

import type { ClustersRawTableProps } from '../clusters-raw-table.interfaces.js'

import { useTranslations }            from 'next-intl'
import { useQueryState }              from 'nuqs'

import { ExportButton }               from '@shared/buttons'

export const ClustersRawTableExport = ({ table, isFetching }: ClustersRawTableProps): ReactNode => {
  const t = useTranslations('clusters-table')
  const [tokenAddress] = useQueryState('tokenAddress', { defaultValue: '' })

  const allData = table.getCoreRowModel().rows.map((row) => row.original)

  return (
    <ExportButton
      size='medium'
      fileName={`clusters-${tokenAddress}`}
      loading={isFetching}
      exportValue={allData}
    >
      {t('download')}
    </ExportButton>
  )
}
