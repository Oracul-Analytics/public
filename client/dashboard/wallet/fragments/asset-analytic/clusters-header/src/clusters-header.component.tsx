import type { ReactNode }      from 'react'

import { useTranslations }     from 'next-intl'

import { Box }                 from '@ui/layout'
import { Title }               from '@ui/text'

import { TokenAddressSearch }  from './token-address-search/index.js'
import { WalletAddressSearch } from './wallet-address-search/index.js'

export const ClustersHeader = (): ReactNode => {
  const t = useTranslations('clusters')

  return (
    <Box
      width='$full'
      minHeight='$17xl'
      maxHeight='$17xl'
      alignItems='center'
      paddingY='$md'
      paddingX='$4xl'
      borderBottom='$line.generic-solid'
      justifyContent='space-between'
    >
      <Box gap='$3xs'>
        <Title level={2}>{t('title')}</Title>
      </Box>
      <Box gap='$md'>
        <TokenAddressSearch />
        <WalletAddressSearch />
      </Box>
    </Box>
  )
}
