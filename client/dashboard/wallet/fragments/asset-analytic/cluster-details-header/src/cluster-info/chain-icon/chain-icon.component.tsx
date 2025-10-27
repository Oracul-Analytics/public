import type { ReactNode }      from 'react'

import type { ChainIconProps } from './chain-icon.interfaces.js'

import { Chain }               from '@shared/data'
import { Row }                 from '@ui/layout'
import { Text }                from '@ui/text'

import { chains }              from './chain-icon.constants.js'
import { isChainEnum }         from './chain-icon.utils.js'

export const ChainIcon = ({ network = Chain.Ethereum }: ChainIconProps): ReactNode => {
  const { Icon, text } = isChainEnum(network)
    ? chains[network]
    : { Icon: chains.ETHEREUM.Icon, text: network }

  return (
    <Row alignItems='center' gap='$11xs'>
      <Icon width='$xs' height='$xs' color='$text.complementary' />
      <Text variant='medium' color='$text.complementary'>
        {text}
      </Text>
    </Row>
  )
}
