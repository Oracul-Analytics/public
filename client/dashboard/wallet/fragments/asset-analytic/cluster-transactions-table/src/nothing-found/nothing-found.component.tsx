import type { ReactNode }  from 'react'

import { useTranslations } from 'next-intl'

import { InboxIcon }       from '@ui/icons'
import { Column }          from '@ui/layout'
import { Title }           from '@ui/text'

export const NothingFound = (): ReactNode => {
  const t = useTranslations('cluster-transactions-table')

  return (
    <Column width='$full' alignItems='center' justifyContent='center' gap='$6xs'>
      <InboxIcon width='$9xl' height='$9xl' color='$text.complementary' />
      <Title level={3} color='$text.complementary'>
        {t('nothing-found')}
      </Title>
    </Column>
  )
}
