import type { Link }                 from '@shared/data'
import type { SelectItem }           from '@ui/select'

import type { EventsSelectProps }    from './events-select.interfaces.js'
import type { UseEventsItemsReturn } from './events-select.interfaces.js'

import { useClusterLinks }           from '../../hooks/index.js'

export const useEventsItems = ({ table, onSelect }: EventsSelectProps): UseEventsItemsReturn => {
  const { data: { links = [] } = { links: [] } } = useClusterLinks()

  const eventsItems: Array<SelectItem> = [...new Set(links.map((link) => link.linkType))]
    .sort((prev, next) => prev.localeCompare(next))
    .map((linkType) => ({ id: linkType, text: linkType }))

  const handleSelect = (items: Array<SelectItem>): void => {
    onSelect(items)

    table.setColumnFilters((prev) => {
      const withoutEventFilters = prev.filter((item) => item.id !== 'linkType')

      if (!items.length) {
        return withoutEventFilters
      }

      const eventIds = items.map((item) => item.id)

      const filterFn = (link: Link): boolean => eventIds.includes(link.linkType)

      return [...withoutEventFilters, { id: 'linkType', value: eventIds, filterFn }]
    })
  }

  return { eventsItems, handleSelect }
}
