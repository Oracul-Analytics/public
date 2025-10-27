import type { Link }        from '@shared/data'
import type { SortOptions } from '@shared/utils'
import type { ColumnSort }  from '@tanstack/react-table'

const transformToNumberKeys: Array<keyof Link> = ['transactionWeight', 'usdWeight']

export const transformSorting = (sorting: ColumnSort): SortOptions => ({
  key: sorting.id,
  desc: sorting.desc,
  transformToNumberKeys,
})
