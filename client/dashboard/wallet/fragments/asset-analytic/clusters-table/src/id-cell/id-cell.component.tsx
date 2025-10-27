import type { ReactNode }   from 'react'

import type { IdCellProps } from './id-cell.interfaces.js'

import { Column }           from '@ui/layout'
import { Text }             from '@ui/text'
import { truncateAddress }  from '@shared/utils'

export const IdCell = ({ content }: IdCellProps): ReactNode => {
  const shortAddress = truncateAddress(content)

  return (
    <Column gap='$11xs' alignItems='flex-start' justifyContent='center' paddingX='$md'>
      <Text variant='large' color='$text.complementary' title={shortAddress}>
        {shortAddress}
      </Text>
    </Column>
  )
}
