import type { ReactNode }  from 'react'

import { useTranslations } from 'next-intl'

import { LoaderBlueIcon }  from '@ui/icons'
import { AnimatePresence } from '@ui/layout'
import { Box }             from '@ui/layout'
import { Column }          from '@ui/layout'
import { MotionBox }       from '@ui/layout'
import { Title }           from '@ui/text'

export const GraphLoading = (): ReactNode => {
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
        <AnimatePresence>
          <MotionBox
            width='$4xl'
            height='$4xl'
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <LoaderBlueIcon width='$4xl' height='$4xl' />
          </MotionBox>
        </AnimatePresence>
        <Title level={3} color='$text.complementary'>
          {t('loading-data')}
        </Title>
      </Column>
    </Box>
  )
}
