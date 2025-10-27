import type { ReactNode }  from 'react'

import { useTranslations } from 'next-intl'
import { parseAsIndex }    from 'nuqs'
import { useQueryState }   from 'nuqs'
import { useState }        from 'react'

import { SearchInput }     from '@ui/input'

export const TokenAddressSearch = (): ReactNode => {
  const t = useTranslations('clusters')

  const [tokenAddress, setTokenAddress] = useQueryState('tokenAddress')
  const [page, setPage] = useQueryState('page', parseAsIndex)
  const [searchValue, setSearchValue] = useState<string>(tokenAddress || '')

  const handleSearch = (): void => {
    setTokenAddress(searchValue || null)

    if (page) {
      setPage(null)
    }
  }

  return (
    <SearchInput
      value={searchValue}
      placeholder={t('search')}
      onChange={setSearchValue}
      onSearch={handleSearch}
    />
  )
}
