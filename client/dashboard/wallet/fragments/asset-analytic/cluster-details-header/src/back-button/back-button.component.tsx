import type { ReactNode }  from 'react'

import { useQueryState }   from 'nuqs'

import { Button }          from '@ui/button'
import { ChevronLeftIcon } from '@ui/icons'
import { Link }            from '@ui/link'

import { defaultRoute }    from './back-button.constants.js'

export const BackButton = (): ReactNode => {
  const [from] = useQueryState('from')

  const route = from?.startsWith(defaultRoute) ? from : defaultRoute

  return (
    <Link href={route}>
      <Button size='extraLarge' variant='secondary' addonLeft={<ChevronLeftIcon width='$2xl' />} />
    </Link>
  )
}
