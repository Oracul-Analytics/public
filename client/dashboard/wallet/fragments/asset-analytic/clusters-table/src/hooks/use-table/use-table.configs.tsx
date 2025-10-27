import type { Cluster }           from '@shared/data'

import { createColumnHelper }     from '@tanstack/react-table'

import { Cell }                   from '@ui/table'
import { convertUnixEpochToDate } from '@shared/utils'
import { shortenNumber }          from '@shared/utils'

import { IdCell }                 from '../../id-cell/index.js'
import { LastOperationCell }      from '../../last-operation-cell/index.js'
import { TranslatedHeader }       from '../../translated-header/index.js'

const columnHelper = createColumnHelper<Cluster>()

export const columnsConfig = [
  columnHelper.accessor('clusterId', {
    header: () => <TranslatedHeader id='id' />,
    size: 40,
    meta: { wrapperProps: { justifyContent: 'left', marginLeft: '$4xl' } },
    cell: (info) => <IdCell content={info.getValue()} />,
    enableSorting: true,
  }),
  columnHelper.accessor('nodesCount', {
    header: () => <TranslatedHeader id='wallets' />,
    meta: { wrapperProps: { justifyContent: 'right' } },
    cell: (info) => <Cell content={shortenNumber(info.getValue())} />,
    enableSorting: true,
  }),
  columnHelper.accessor('linksCount', {
    header: () => <TranslatedHeader id='quantity' />,
    meta: { wrapperProps: { justifyContent: 'right' } },
    cell: (info) => <Cell content={shortenNumber(info.getValue())} />,
    enableSorting: true,
  }),
  columnHelper.accessor('weightedAverageBuyPrice', {
    header: () => <TranslatedHeader id='avg-buy-price' />,
    meta: { wrapperProps: { justifyContent: 'right' } },
    cell: (info) => <Cell content={shortenNumber(info.getValue()) ?? '—'} />,
    enableSorting: true,
  }),
  columnHelper.accessor('weightedAverageSellPrice', {
    header: () => <TranslatedHeader id='avg-sell-price' />,
    meta: { wrapperProps: { justifyContent: 'right' } },
    cell: (info) => <Cell content={shortenNumber(info.getValue()) ?? '—'} />,
    enableSorting: true,
  }),
  columnHelper.accessor('realizedPnl', {
    header: () => <TranslatedHeader id='realized-pnl' />,
    meta: { wrapperProps: { justifyContent: 'right' } },
    cell: (info) => <Cell content={shortenNumber(info.getValue())} />,
    enableSorting: true,
  }),
  columnHelper.accessor('unrealizedPnl', {
    header: () => <TranslatedHeader id='unrealized-pnl' />,
    meta: { wrapperProps: { justifyContent: 'right' } },
    cell: (info) => <Cell content={shortenNumber(info.getValue())} />,
    enableSorting: true,
  }),
  columnHelper.accessor('totalPnl', {
    header: () => <TranslatedHeader id='total-pnl' />,
    meta: { wrapperProps: { justifyContent: 'right' } },
    cell: (info) => <Cell content={shortenNumber(info.getValue())} />,
    enableSorting: true,
  }),
  columnHelper.accessor('lastDealUnix', {
    header: () => <TranslatedHeader id='last-operation' />,
    meta: { wrapperProps: { justifyContent: 'left', textAlign: 'left' } },
    cell: (info) => <LastOperationCell date={convertUnixEpochToDate(info.getValue())} />,
    enableSorting: true,
  }),
]
