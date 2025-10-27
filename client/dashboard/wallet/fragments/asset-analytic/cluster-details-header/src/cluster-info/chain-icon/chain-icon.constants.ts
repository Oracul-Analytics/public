import type { ChainItem } from './chain-icon.interfaces.js'

import { Chain }          from '@shared/data'
import { EthereumIcon }   from '@ui/icons'

export const chains: Record<Chain, ChainItem> = {
  [Chain.Ethereum]: { text: Chain.Ethereum, Icon: EthereumIcon },
}
