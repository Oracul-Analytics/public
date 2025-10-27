import type { Link }                   from '@shared/data'
import type { ReactNode }              from 'react'

import type { TransactionsTableProps } from './transactions-table.interfaces.js'

import { TablePagination }             from '@shared/table-pagination-fragment'
import { Box }                         from '@ui/layout'
import { Row }                         from '@ui/layout'
import { HeaderGroupWrapper }          from '@ui/table'
import { Table }                       from '@ui/table'
import { Thead }                       from '@ui/table'
import { Tbody }                       from '@ui/table'
import { RowWrapper }                  from '@ui/table'

import { TransactionsTableCopy }       from './transactions-table-copy/index.js'
import { TransactionsTableExport }     from './transactions-table-export/index.js'

export const TransactionsTable = ({ table, isFetching }: TransactionsTableProps): ReactNode => {
  const headerGroups = table.getHeaderGroups()
  const { rows } = table.getRowModel()

  return (
    <>
      <Box borderRadius='$xl' border='$line.generic' overflow='hidden'>
        <Table borderCollapse='collapse' minWidth='870px' width='$full' background='$base.float'>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <HeaderGroupWrapper
                key={`header-group-wrapper-${headerGroup.id}`}
                table={table}
                backgroundColor='$table.header'
                {...headerGroup}
              />
            ))}
          </Thead>
          <Tbody>
            {rows.map((row) => (
              <RowWrapper<Link>
                key={`row-wrapper-${row.id}`}
                {...row}
                backgroundColor='$table.cell'
                isLoading={isFetching}
              />
            ))}
          </Tbody>
        </Table>
      </Box>
      <Row justifyContent='space-between' gap='$13xs' flexWrap='wrap'>
        <TablePagination table={table} />
        <Box height='$auto' alignItems='center' paddingX='$md'>
          <TransactionsTableExport table={table} isFetching={isFetching} />
          <TransactionsTableCopy table={table} isFetching={isFetching} />
        </Box>
      </Row>
    </>
  )
}
