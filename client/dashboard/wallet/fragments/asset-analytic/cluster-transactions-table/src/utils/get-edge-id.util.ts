import type { Link }       from '@shared/data'

import { truncateAddress } from '@shared/utils'

export const getEdgeId = (link: Link): string => {
  const source = truncateAddress(link.sourceAddress)
  const target = truncateAddress(link.targetAddress)

  return `${source}-${target}`
}
