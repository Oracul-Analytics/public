import type { ReactNode }  from 'react'

import { useTranslations } from 'next-intl'

import { ErrorCircleIcon } from '@ui/icons'
import { Box }             from '@ui/layout'
import { Column }          from '@ui/layout'
import { Title }           from '@ui/text'

export const GraphError = (): ReactNode => {
  const t = useTranslations('cluster-graph-analysis')

  return (
    <Box
      position='absolute'
      top='$half'
      left='$half'
      zIndex='$bottom.default'
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <Column fill gap='$5xs' alignItems='center'>
        <ErrorCircleIcon width='$4xl' height='$4xl' color='$text.danger' />
        <Title level={3} color='$text.danger'>
          {t('loading-error')}
        </Title>
      </Column>
    </Box>
  )
}
