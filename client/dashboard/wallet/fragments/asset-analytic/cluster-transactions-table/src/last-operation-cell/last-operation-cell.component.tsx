import type { ReactNode }              from 'react'

import type { LastOperationCellProps } from './last-operation-cell.interfaces.js'

import { useFormatter }                from 'next-intl'

import { Cell }                        from '@ui/table'
import { convertUnixEpochToDate }      from '@shared/utils'

export const LastOperationCell = ({ unix }: LastOperationCellProps): ReactNode => {
  const { dateTime } = useFormatter()
  const date = convertUnixEpochToDate(unix)

  if (!date) {
    return null
  }

  return (
    <Cell
      content={dateTime(date, { minute: '2-digit', hour: '2-digit' })}
      secondaryContent={dateTime(date, { day: '2-digit', month: '2-digit', year: 'numeric' })}
      alignItems='start'
    />
  )
}
