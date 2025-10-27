import type { Link }          from '@shared/data'

import { createColumnHelper } from '@tanstack/react-table'

import { Cell }               from '@ui/table'
import { shortenNumber }      from '@shared/utils'

import { LastOperationCell }  from '../../last-operation-cell/index.js'
import { TranslatedHeader }   from '../../translated-header/index.js'

const columnHelper = createColumnHelper<Link>()

export const columnsConfig = [
  columnHelper.accessor('txId', {
    header: () => <TranslatedHeader id='txid' />,
    meta: { wrapperProps: { justifyContent: 'left', marginLeft: '$4xl' } },
    cell: (info) => <Cell content={info.getValue()} />,
    enableSorting: true,
  }),
  columnHelper.accessor('linkType', {
    header: () => <TranslatedHeader id='operation-type' />,
    meta: { wrapperProps: { justifyContent: 'left' } },
    cell: (info) => <Cell content={info.getValue()} />,
    enableSorting: true,
  }),
  columnHelper.accessor('transactionWeight', {
    header: () => <TranslatedHeader id='token-count' />,
    meta: { wrapperProps: { justifyContent: 'right' } },
    cell: (info) => (
      <Cell
        content={shortenNumber(info.getValue())}
        contentTitle={info.getValue()?.toLocaleString()}
      />
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('usdWeight', {
    header: () => <TranslatedHeader id='usd-amount' />,
    meta: { wrapperProps: { justifyContent: 'right' } },
    cell: (info) => (
      <Cell
        content={shortenNumber(info.getValue())}
        contentTitle={info.getValue()?.toLocaleString()}
      />
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('unix', {
    header: () => <TranslatedHeader id='last-operation' />,
    meta: { wrapperProps: { justifyContent: 'left', textAlign: 'left' } },
    cell: (info) => <LastOperationCell unix={info.getValue()} />,
    enableSorting: true,
  }),
]
