import type { ReactNode }        from 'react'

import type { EdgesSelectProps } from './edges-select.interfaces.js'

import { useTranslations }       from 'next-intl'

import { Select }                from '@ui/select'

import { useClusterLinks }       from '../../hooks/index.js'
import { useEdgesItems }         from './use-edges-items.hook.js'

export const EdgesSelect = ({ table, selectedItems, onSelect }: EdgesSelectProps): ReactNode => {
  const t = useTranslations('cluster-transactions-table')
  const { isFetching, isError } = useClusterLinks()

  const { edgesItems, handleSelect } = useEdgesItems({ table, selectedItems, onSelect })

  return (
    <Select
      multiselect
      items={edgesItems}
      selectedItems={selectedItems}
      resetText={t('reset')}
      placeholder={t('select-edge')}
      disabled={isFetching || isError}
      onChange={handleSelect}
    />
  )
}
