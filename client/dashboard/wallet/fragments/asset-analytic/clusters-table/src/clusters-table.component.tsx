import type { ReactNode }   from 'react'

import { useQueryState }    from 'nuqs'

import { Condition }        from '@ui/condition'
import { Column }           from '@ui/layout'
import { Box }              from '@ui/layout'

import { ClustersRawTable } from './clusters-raw-table/index.js'
import { ClustersTitle }    from './clusters-title/index.js'
import { NothingFound }     from './nothing-found/index.js'
import { useTable }         from './hooks/index.js'

export const ClustersTable = (): ReactNode => {
  const [tokenAddress] = useQueryState('tokenAddress', { defaultValue: '' })

  const { table, status } = useTable()

  const showTable = status === 'success' || status === 'skeleton'

  return (
    <Box height='$full' overflow='auto' justifyContent='center' paddingX='$4xl'>
      <Column gap='$md' width='$full'>
        <Condition match={!!tokenAddress}>
          <ClustersTitle table={table} status={status} />
          <Condition match={showTable} fallback={<NothingFound />}>
            <Box overflow='hidden' flexDirection='column'>
              <ClustersRawTable table={table} isFetching={status === 'skeleton'} />
            </Box>
          </Condition>
        </Condition>
      </Column>
    </Box>
  )
}
