import type { ReactNode }   from 'react'

import { useTranslations }  from 'next-intl'
import { useState }         from 'react'

import { SearchInput }      from '@ui/input'
import { Row }              from '@ui/layout'
import { Title }            from '@ui/text'

/** @note import {} from '../hooks/index.js' will cause ReferenceError */
import { useFocusedWallet } from '../hooks/use-focused-wallet/index.js'

export const GraphHeader = (): ReactNode => {
  const t = useTranslations('cluster-graph-analysis')

  const { focusedWallet, setFocusedWallet } = useFocusedWallet()
  const [searchValue, setSearchValue] = useState<string>(focusedWallet || '')

  const handleSearch = (): void => {
    setFocusedWallet(searchValue)
  }

  return (
    <Row gap='$7xs' justifyContent='space-between' alignItems='center'>
      <Title level={3}>{t('title')}</Title>
      <SearchInput
        value={searchValue}
        placeholder={t('search-wallet')}
        onChange={setSearchValue}
        onSearch={handleSearch}
      />
    </Row>
  )
}
