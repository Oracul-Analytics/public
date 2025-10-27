import type { ReactNode }          from 'react'

import type { ClustersTitleProps } from './clusters-title.interfaces.js'

import { useTranslations }         from 'next-intl'

import { Button }                  from '@ui/button'
import { Condition }               from '@ui/condition'
import { ChevronUpIcon }           from '@ui/icons'
import { Row }                     from '@ui/layout'
import { Title }                   from '@ui/text'
import { shortenNumber }           from '@shared/utils'

export const ClustersTitle = ({ table, status }: ClustersTitleProps): ReactNode => {
  const t = useTranslations('clusters-table')

  const clustersCount = shortenNumber(table.getRowCount())

  return (
    <Row gap='$7xs' alignItems='center'>
      <Title level={3}>{t('title')}</Title>
      <Condition match={status === 'success'}>
        <Title level={3} color='$text.hint'>
          {t('subtitle', { number: clustersCount || '' })}
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
