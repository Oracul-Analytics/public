import type { Link }                from '@shared/data'
import type { SelectItem }          from '@ui/select'

import type { EdgesSelectProps }    from './edges-select.interfaces.js'
import type { UseEdgesItemsReturn } from './edges-select.interfaces.js'

import { useClusterLinks }          from '../../hooks/index.js'
import { getEdgeId }                from '../../utils/index.js'

export const useEdgesItems = ({ table, onSelect }: EdgesSelectProps): UseEdgesItemsReturn => {
  const { data: { links = [] } = { links: [] } } = useClusterLinks()

  const edgesItems: Array<SelectItem> = [...new Set(links.map(getEdgeId))]
    .sort((prev, next) => prev.localeCompare(next))
    .map((edge) => ({ id: edge, text: edge }))

  const handleSelect = (items: Array<SelectItem>): void => {
    onSelect(items)

    table.setColumnFilters((prev) => {
      const withoutTxIdFilters = prev.filter((item) => item.id !== 'txId')

      if (!items.length) {
        return withoutTxIdFilters
      }

      const edgeValue = items.map((item) => item.id)

      const filterFn = (link: Link): boolean => edgeValue.includes(getEdgeId(link))

      return [...withoutTxIdFilters, { id: 'txId', value: edgeValue, filterFn }]
    })
  }

  return { edgesItems, handleSelect }
}
