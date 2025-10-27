import type { Link } from '@shared/data'

export const getEdgeId = (link: Link): string => `${link.sourceId}-${link.targetId}`
