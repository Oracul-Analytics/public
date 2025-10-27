import type { ReactNode }             from 'react'

import type { TranslatedHeaderProps } from './translated-header.interfaces.js'

import { useTranslations }            from 'next-intl'

export const TranslatedHeader = ({ id }: TranslatedHeaderProps): ReactNode => {
  const t = useTranslations('clusters-table.columns')

  return t(id)
}
