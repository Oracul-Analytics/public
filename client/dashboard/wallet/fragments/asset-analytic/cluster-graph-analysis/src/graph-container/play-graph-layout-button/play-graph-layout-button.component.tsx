import type { ReactNode }                  from 'react'

import type { PlayGraphLayoutButtonProps } from './play-graph-layout-button.interfaces.js'

import { useTranslations }                 from 'next-intl'

import { Button }                          from '@ui/button'
import { PauseIcon }                       from '@ui/icons'
import { PlayIcon }                        from '@ui/icons'

export const PlayGraphLayoutButton = ({
  isPlayed,
  ...props
}: PlayGraphLayoutButtonProps): ReactNode => {
  const t = useTranslations('cluster-graph-analysis')

  return (
    <Button
      variant='secondary'
      size='small'
      addonRight={
        isPlayed ? <PauseIcon width='$md' height='$md' /> : <PlayIcon width='$md' height='$md' />
      }
      {...props}
    >
      {t('force-atlas-2')}
    </Button>
  )
}
