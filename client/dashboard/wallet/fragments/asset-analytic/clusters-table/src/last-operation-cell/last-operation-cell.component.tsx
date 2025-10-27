import type { ReactNode }              from 'react'

import type { LastOperationCellProps } from './last-operation-cell.interfaces.js'

import { useFormatter }                from 'next-intl'

import { Column }                      from '@ui/layout'
import { Text }                        from '@ui/text'

export const LastOperationCell = ({ date }: LastOperationCellProps): ReactNode => {
  const format = useFormatter()

  const formattedTime = format.dateTime(date || 0, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const formattedDate = format.dateTime(date || 0, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return (
    <Column gap='$11xs' alignItems='flex-start' justifyContent='center' paddingX='$md'>
      <Text variant='large' color='$text.complementary'>
        {formattedTime}
      </Text>
      <Text variant='large' color='$text.secondary'>
        {formattedDate}
      </Text>
    </Column>
  )
}
