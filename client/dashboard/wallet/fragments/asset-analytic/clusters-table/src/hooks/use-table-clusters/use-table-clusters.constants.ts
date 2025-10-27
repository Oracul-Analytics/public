import type { PaginationState }    from '@tanstack/react-table'

import { createClusterStableMock } from '@shared/data'

export const emptyData = []

export const initialPagination: PaginationState = {
  pageIndex: 0,
  pageSize: 20,
}

export const skeletonData = Array.from(
  { length: initialPagination.pageSize },
  createClusterStableMock
)
