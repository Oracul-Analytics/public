import type { Cluster }                  from '@shared/data'
import type { ReactNode }                from 'react'

import type { ClustersRawTableRowProps } from './clusters-raw-table-row.interfaces.js'

import { useRouter }                     from 'next/router.js'
import { useQueryState }                 from 'nuqs'

import { RowWrapper }                    from '@ui/table'
import { useHover }                      from '@ui/utils'

export const ClustersRawTableRow = ({ row, isFetching }: ClustersRawTableRowProps): ReactNode => {
  const [hover, hoverProps] = useHover()
  const [tokenAddress] = useQueryState('tokenAddress', { defaultValue: '' })
  const [searchWallet] = useQueryState('searchWallet')
  const { asPath } = useRouter()

  return (
    <RowWrapper<Cluster>
      {...row}
      {...hoverProps}
      backgroundColor={hover ? '$table.cell-hover' : '$table.cell'}
      isLoading={isFetching}
      cursor='pointer'
      linkHref={{
        pathname: '/asset-analytic/clusters/[id]',
        query: {
          id: row.original.clusterId.toString(),
          from: asPath,
          tokenAddress,
          searchWallet: searchWallet || undefined,
        },
      }}
    />
  )
}
