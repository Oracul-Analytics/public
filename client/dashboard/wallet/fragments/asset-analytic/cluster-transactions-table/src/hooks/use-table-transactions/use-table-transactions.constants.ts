import type { Link }            from '@shared/data'
import type { PaginationState } from '@tanstack/react-table'

import { createLinkStableMock } from '@shared/data'

export const emptyData: Array<Link> = []

export const initialPagination: PaginationState = {
  pageIndex: 0,
  pageSize: 10,
}

export const skeletonData = Array.from({ length: initialPagination.pageSize }, createLinkStableMock)
