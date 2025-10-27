import type { ReactNode }    from 'react'

import { useTranslations }   from 'next-intl'

import { Condition }         from '@ui/condition'
import { NodeIcon }          from '@ui/icons'
import { Box }               from '@ui/layout'
import { Text }              from '@ui/text'
import { useClusterDetails } from '@shared/hooks'
import { shortenNumber }     from '@shared/utils'

import { legendItems }       from './graph-legend.constant.js'

export const GraphLegend = (): ReactNode => {
  const t = useTranslations('cluster-graph-analysis.legend')

  const { cluster, isLoading, isError } = useClusterDetails()

  return (
    <Box
      width='$full'
      paddingX='$4xl'
      paddingY='$xl'
      borderTop='$line.generic'
      justifyContent='space-between'
      flexWrap='wrap'
      gap='$6xl'
    >
      <Box gap='$6xl' flexWrap='wrap'>
        {legendItems.map((item) => (
          <Box key={item.id} gap='$3xs' alignItems='center'>
            <NodeIcon width='$md' height='$md' color={item.color} />
            <Text variant='large' color='$text.secondary'>
              {t(item.text)}
            </Text>
          </Box>
        ))}
      </Box>
      <Condition match={!isLoading && !isError}>
        <Box flexShrink={0}>
          <Text variant='extraLarge' color='$text.complementary'>
            {t('wallets-count', { number: shortenNumber(cluster?.nodesCount) || '' })}
          </Text>
        </Box>
      </Condition>
    </Box>
  )
}
