import type { UseTableTransactionsProps }  from './use-table-transactions.interfaces.js'
import type { UseTableTransactionsReturn } from './use-table-transactions.interfaces.js'

import { sortPrimitiveRecordArray }        from '@shared/utils'
import { filterRecordArray }               from '@shared/utils'
import { paginateArray }                   from '@shared/utils'

import { useClusterLinks }                 from '../use-cluster-links/index.js'
import { transformSorting }                from '../use-table/index.js'
import { emptyData }                       from './use-table-transactions.constants.js'
import { skeletonData }                    from './use-table-transactions.constants.js'

// TODO: switch to server-side pagination, sorting and filtering once the backend is implemented
export const useTableTransactions = ({
  pagination,
  sorting,
  filters,
}: UseTableTransactionsProps): UseTableTransactionsReturn => {
  const { data, isFetching, isError } = useClusterLinks()

  const isSkeleton = isFetching && !data?.links?.length

  if (isSkeleton) {
    return {
      status: 'skeleton',
      transactions: skeletonData,
      transactionsCount: skeletonData.length,
    }
  }

  if (isError || !data?.links?.length) {
    return {
      status: isError ? 'error' : 'empty',
      transactions: emptyData,
      transactionsCount: emptyData.length,
    }
  }

  let transactions = data.links

  if (filters.length) {
    transactions = filterRecordArray(transactions, filters)
  }

  if (sorting.at(0)) {
    transactions = sortPrimitiveRecordArray(transactions, transformSorting(sorting[0]))
  }

  const paginatedTransactions = paginateArray(
    transactions,
    pagination.pageIndex,
    pagination.pageSize
  )

  return {
    status: 'success',
    transactions: paginatedTransactions,
    transactionsCount: transactions.length,
  }
}
