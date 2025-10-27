import type { ReactNode }           from 'react'

import { Condition }                from '@ui/condition'
import { Column }                   from '@ui/layout'
import { Box }                      from '@ui/layout'

import { NothingFound }             from './nothing-found/index.js'
import { TransactionsTableFilters } from './transactions-table-filters/index.js'
import { TransactionsTable }        from './transactions-table/index.js'
import { TransactionsTitle }        from './transactions-title/index.js'
import { useTable }                 from './hooks/index.js'

export const ClusterTransactionsTable = (): ReactNode => {
  const { table, status } = useTable()

  const showTable = status === 'success' || status === 'skeleton'

  return (
    <Column minHeight='820px' gap='$md' paddingX='$9xl'>
      <TransactionsTitle table={table} status={status} />
      <TransactionsTableFilters table={table} />
      <Condition match={showTable} fallback={<NothingFound />}>
        <Box overflow='hidden' flexDirection='column'>
          <TransactionsTable table={table} isFetching={status === 'skeleton'} />
        </Box>
      </Condition>
    </Column>
  )
}
