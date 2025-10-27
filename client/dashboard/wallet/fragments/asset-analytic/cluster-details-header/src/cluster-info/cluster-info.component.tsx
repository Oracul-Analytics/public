import type { ReactNode }         from 'react'

import type { ClusterInfoProps }  from './cluster-info.interfaces.js'

import { useFormatter }           from 'next-intl'
import { useTranslations }        from 'next-intl'

import { TruncatedType }          from '@shared/utils'
import { Condition }              from '@ui/condition'
import { Box }                    from '@ui/layout'
import { Row }                    from '@ui/layout'
import { Column }                 from '@ui/layout'
import { Skeleton }               from '@ui/skeleton'
import { Tag }                    from '@ui/tag'
import { Title }                  from '@ui/text'
import { Text }                   from '@ui/text'
import { convertUnixEpochToDate } from '@shared/utils'
import { shortenNumber }          from '@shared/utils'
import { truncateAddress }        from '@shared/utils'

import { ChainIcon }              from './chain-icon/index.js'

// TODO uncomment after sync with backend
export const ClusterInfo = ({ cluster, isLoading }: ClusterInfoProps): ReactNode => {
  const t = useTranslations('cluster-details')

  const format = useFormatter()
  const date = convertUnixEpochToDate(cluster?.lastDealUnix)
  const formattedDate = date
    ? format.dateTime(date, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : ''

  return (
    <Column gap='$7xs' alignItems='flex-start' justifyContent='center' flexShrink={0}>
      <Condition match={isLoading}>
        <Skeleton viewBox='0 0 260 90' width={260} height={90}>
          <rect x='0' y='0' rx='5' ry='5' width='80' height='14' />
          <rect x='100' y='0' rx='5' ry='5' width='80' height='14' />
          <rect x='0' y='20' rx='5' ry='5' width='230' height='24' />
          <rect x='0' y='50' rx='5' ry='5' width='100' height='12' />
          <rect x='0' y='70' rx='5' ry='5' width='200' height='12' />
        </Skeleton>
      </Condition>
      <Condition match={!isLoading}>
        <Row gap='$7xs'>
          <Tag variant='misc'>{cluster?.ticker}</Tag>
          <Box width='$full'>
            <ChainIcon network={cluster?.network} />
          </Box>
        </Row>
        <Title level={3}>{truncateAddress(cluster?.clusterId, TruncatedType.LONG)}</Title>
        <Text
          variant='small'
          color='$text.complementary'
          title={cluster?.nodesCount.toLocaleString()}
        >
          {t('wallets-count', { number: shortenNumber(cluster?.nodesCount) || '' })}
        </Text>
        <Text variant='small' color='$text.complementary'>
          {t('last-operation', { date: formattedDate })}
        </Text>
      </Condition>
    </Column>
  )
}
