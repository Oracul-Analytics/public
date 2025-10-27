import type { SelectItem }                    from '@ui/select'
import type { ReactNode }                     from 'react'

import type { TransactionsTableFiltersProps } from './transactions-table-filters.interfaces.js'

import { useTranslations }                    from 'next-intl'
import { useState }                           from 'react'

import { Button }                             from '@ui/button'
import { Box }                                from '@ui/layout'

import { EdgesSelect }                        from './edges-select/index.js'
import { EventsSelect }                       from './events-select/index.js'

export const TransactionsTableFilters = ({ table }: TransactionsTableFiltersProps): ReactNode => {
  const t = useTranslations('cluster-transactions-table')
  const [selectedEdges, setSelectedEdges] = useState<Array<SelectItem>>([])
  const [selectedEvents, setSelectedEvents] = useState<Array<SelectItem>>([])

  const handleReset = (): void => {
    table.resetColumnFilters()
    setSelectedEdges([])
    setSelectedEvents([])
  }

  return (
    <Box gap='$md'>
      <Box width='250px'>
        <EdgesSelect table={table} selectedItems={selectedEdges} onSelect={setSelectedEdges} />
      </Box>
      <Box width='250px'>
        <EventsSelect table={table} selectedItems={selectedEvents} onSelect={setSelectedEvents} />
      </Box>
      <Button variant='tertiary' size='extraLarge' onClick={handleReset}>
        {t('reset')}
      </Button>
    </Box>
  )
}
