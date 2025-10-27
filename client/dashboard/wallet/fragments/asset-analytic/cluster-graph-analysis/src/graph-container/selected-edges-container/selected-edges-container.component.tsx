import type { ReactNode }                   from 'react'

import type { SelectedEdgesContainerProps } from './selected-edges-container.interfaces.js'

import { Box }                              from '@ui/layout'
import { Column }                           from '@ui/layout'
import { Row }                              from '@ui/layout'
import { Text }                             from '@ui/text'

import { useSelectedItems }                 from './hooks/index.js'

export const SelectedEdgesContainer = ({ edges = [] }: SelectedEdgesContainerProps): ReactNode => {
  const { items } = useSelectedItems({ edges })

  return (
    <Box
      width='160px'
      flexDirection='column'
      gap='$md'
      padding='$5xs'
      borderRadius='$2xl'
      backgroundColor='$base.background'
    >
      {items.map((item) => (
        <Column key={item.id} gap='$7xs'>
          <Text variant='medium'>{item.title}</Text>
          {item.stats.map((stat) => (
            <Row key={`${item.id}${stat.text}`} justifyContent='space-between' gap='$13xs'>
              <Text variant='medium' color='$text.secondary'>
                {stat.text}
              </Text>
              <Text variant='medium' color='$text.complementary'>
                {stat.value}
              </Text>
            </Row>
          ))}
        </Column>
      ))}
    </Box>
  )
}
