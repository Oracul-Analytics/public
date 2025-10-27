import type { ReactNode }         from 'react'

import type { ClusterStatsProps } from './cluster-stats.interfaces.js'

import { useTranslations }        from 'next-intl'

import { Condition }              from '@ui/condition'
import { ArrowDownIcon }          from '@ui/icons'
import { ArrowUpIcon }            from '@ui/icons'
import { Box }                    from '@ui/layout'
import { Column }                 from '@ui/layout'
import { Skeleton }               from '@ui/skeleton'
import { Space }                  from '@ui/text'
import { Text }                   from '@ui/text'
import { Title }                  from '@ui/text'

import { getStatsItems }          from './utils/index.js'

export const ClusterStats = ({ cluster, isLoading }: ClusterStatsProps): ReactNode => {
  const t = useTranslations('cluster-details.stats')

  const { statsItems } = getStatsItems({ cluster })

  return (
    <Box
      fill
      minWidth='800px'
      paddingY='$6xs'
      paddingX='$4xl'
      justifyContent='space-between'
      backgroundColor='$base.background'
      border='$line.generic-solid'
      borderRadius='$md'
    >
      {statsItems.map((item) => (
        <Column key={item.id.toString()} gap='$7xs' justifyContent='center'>
          <Text variant='large' color='$text.secondary'>
            {t(item.id)}
          </Text>
          <Box>
            <Condition match={isLoading}>
              <Skeleton viewBox='0 0 120 18' width={120} height={18}>
                <rect x='0' y='0' rx='5' ry='5' width='120' height='18' />
              </Skeleton>
            </Condition>
            <Condition match={!isLoading}>
              <Title display='inline-flex' alignItems='center' level={4} title={item.title}>
                <Condition match={!!item.value}>{item.value}</Condition>
                <Condition match={!!item.buy}>
                  {item.buy}
                  <Space />
                  <ArrowUpIcon width='$4xl' height='$4xl' color='$text.positive' />
                </Condition>
                <Condition match={!!item.sell}>
                  <Space count={2} />
                  {item.sell}
                  <Space />
                  <ArrowDownIcon width='$4xl' height='$4xl' color='$text.danger' />
                </Condition>
              </Title>
            </Condition>
          </Box>
        </Column>
      ))}
    </Box>
  )
}
