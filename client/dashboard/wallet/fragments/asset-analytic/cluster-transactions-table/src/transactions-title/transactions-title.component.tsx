import type { ReactNode }              from 'react'

import type { TransactionsTitleProps } from './transactions-title.interfaces.js'

import { useTranslations }             from 'next-intl'

import { Button }                      from '@ui/button'
import { Condition }                   from '@ui/condition'
import { ChevronUpIcon }               from '@ui/icons'
import { Row }                         from '@ui/layout'
import { Title }                       from '@ui/text'
import { shortenNumber }               from '@shared/utils'

export const TransactionsTitle = ({ table, status }: TransactionsTitleProps): ReactNode => {
  const t = useTranslations('cluster-transactions-table')

  const transactionsCount = shortenNumber(table.getRowCount())

  return (
    <Row gap='$7xs' alignItems='center'>
      <Title level={3}>{t('title')}</Title>
      <Condition match={status === 'success'}>
        <Title level={3} color='$text.hint'>
          {t('subtitle', { number: transactionsCount || '' })}
        </Title>
      </Condition>
      <Button
        disabled
        size='extraSmall'
        variant='secondary'
        addonLeft={<ChevronUpIcon width='$md' height='$md' />}
      />
    </Row>
  )
}
