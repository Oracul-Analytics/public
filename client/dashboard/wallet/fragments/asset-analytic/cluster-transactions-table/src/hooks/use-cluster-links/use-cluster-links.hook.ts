import type { UseLinksReturn } from '@shared/data'

import { useRouter }           from 'next/router.js'
import { useQueryState }       from 'nuqs'

import { useLinks }            from '@shared/data'

export const useClusterLinks = (): UseLinksReturn => {
  const [tokenAddress] = useQueryState('tokenAddress', { defaultValue: '' })
  const { query } = useRouter()

  const clusterId = Array.isArray(query.id) ? query.id[0] : query.id || ''

  return useLinks({ args: { tokenAddress, clusterId } })
}
