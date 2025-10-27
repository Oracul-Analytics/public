import type { ReactNode }                  from 'react'

import type { SelectedNodeContainerProps } from './selected-node-container.interfaces.js'

import { useTranslations }                 from 'next-intl'

import { CopyButton }                      from '@shared/buttons'
import { Box }                             from '@ui/layout'
import { Row }                             from '@ui/layout'
import { Link }                            from '@ui/link'
import { Text }                            from '@ui/text'
import { shortenNumber }                   from '@shared/utils'
import { truncateAddress }                 from '@shared/utils'
import { route }                           from '@wallet-pnl/routes'

export const SelectedNodeContainer = ({ node }: SelectedNodeContainerProps): ReactNode => {
  const t = useTranslations('cluster-graph-analysis.node')

  const items = [
    { text: t('tokens'), value: `${shortenNumber(node?.tokenBalance)} ${t('eth')}` },
    { text: t('balance'), value: `${shortenNumber(node?.usdBalance)} ${t('usd')}` },
    { text: t('average-buy-price'), value: shortenNumber(node?.weightedAverageBuyPrice) },
    { text: t('average-sell-price'), value: shortenNumber(node?.weightedAverageSellPrice) },
  ] as const

  const routeToWallet = route({
    pathname: '/wallets/[id]',
    query: { id: node?.walletAddress || '' },
  })

  return (
    <Box
      width='250px'
      flexDirection='column'
      gap='$11xs'
      padding='$md'
      borderRadius='$2xl'
      backgroundColor='$base.background'
    >
      <Row justifyContent='space-between' alignItems='center' gap='$13xs'>
        <Text variant='medium' color='$text.secondary'>
          {t('address')}
        </Text>
        <Box alignItems='center' gap='$13xs'>
          <Link href={routeToWallet}>
            <Text variant='medium' color='$text.link'>
              {truncateAddress(node?.walletAddress)}
            </Text>
          </Link>
          <CopyButton
            copyText={node?.walletAddress}
            size='extraSmall'
            iconProps={{ width: '$xs', height: '$xs' }}
          />
        </Box>
      </Row>
      {items.map((item) => (
        <Row key={item.text} justifyContent='space-between' gap='$13xs'>
          <Text variant='medium' color='$text.secondary'>
            {item.text}
          </Text>
          <Text variant='medium' color='$text.complementary'>
            {item.value}
          </Text>
        </Row>
      ))}
    </Box>
  )
}
