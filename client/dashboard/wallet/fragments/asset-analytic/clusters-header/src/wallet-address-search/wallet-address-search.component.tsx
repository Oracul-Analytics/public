import type { ReactNode }  from 'react'

import { useTranslations } from 'next-intl'
import { parseAsIndex }    from 'nuqs'
import { useQueryState }   from 'nuqs'
import { useState }        from 'react'

import { SearchInput }     from '@ui/input'

export const WalletAddressSearch = (): ReactNode => {
  const t = useTranslations('clusters')

  const [searchWallet, setSearchWallet] = useQueryState('searchWallet')
  const [page, setPage] = useQueryState('page', parseAsIndex)
  const [searchValue, setSearchValue] = useState<string>(searchWallet || '')

  const handleSearch = (): void => {
    setSearchWallet(searchValue || null)

    if (page) {
      setPage(null)
    }
  }

  return (
    <SearchInput
      value={searchValue}
      placeholder={t('search-wallet')}
      onChange={setSearchValue}
      onSearch={handleSearch}
    />
  )
}
