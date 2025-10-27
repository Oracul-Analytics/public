import type { ReactNode }         from 'react'

import type { EventsSelectProps } from './events-select.interfaces.js'

import { useTranslations }        from 'next-intl'

import { Select }                 from '@ui/select'

import { useClusterLinks }        from '../../hooks/index.js'
import { useEventsItems }         from './use-events-items.hook.js'

export const EventsSelect = ({ table, selectedItems, onSelect }: EventsSelectProps): ReactNode => {
  const t = useTranslations('cluster-transactions-table')
  const { isFetching, isError } = useClusterLinks()

  const { eventsItems, handleSelect } = useEventsItems({ table, selectedItems, onSelect })

  return (
    <Select
      multiselect
      items={eventsItems}
      selectedItems={selectedItems}
      resetText={t('reset')}
      placeholder={t('operation-type')}
      disabled={isFetching || isError}
      onChange={handleSelect}
    />
  )
}
