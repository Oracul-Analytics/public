import type { ReactNode }             from 'react'

import type { ClustersRawTableProps } from './clusters-raw-table.interfaces.js'

import { TablePagination }            from '@shared/table-pagination-fragment'
import { Box }                        from '@ui/layout'
import { Row }                        from '@ui/layout'
import { HeaderGroupWrapper }         from '@ui/table'
import { Table }                      from '@ui/table'
import { Thead }                      from '@ui/table'
import { Tbody }                      from '@ui/table'

import { ClustersRawTableCopy }       from './clusters-raw-table-copy/index.js'
import { ClustersRawTableExport }     from './clusters-raw-table-export/index.js'
import { ClustersRawTableRow }        from './clusters-raw-table-row/index.js'

export const ClustersRawTable = ({ table, isFetching }: ClustersRawTableProps): ReactNode => {
  const headerGroups = table.getHeaderGroups()
  const { rows } = table.getRowModel()

  return (
    <>
      <Box borderRadius='$xl' border='$line.generic' overflow='hidden'>
        <Box overflow='auto' width='$full'>
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
                <ClustersRawTableRow key={`row-${row.id}`} row={row} isFetching={isFetching} />
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      <Row justifyContent='space-between' gap='$13xs' flexWrap='wrap'>
        <TablePagination table={table} />
        <Box height='$auto' alignItems='center' paddingX='$md'>
          <ClustersRawTableExport table={table} isFetching={isFetching} />
          <ClustersRawTableCopy table={table} isFetching={isFetching} />
        </Box>
      </Row>
    </>
  )
}
