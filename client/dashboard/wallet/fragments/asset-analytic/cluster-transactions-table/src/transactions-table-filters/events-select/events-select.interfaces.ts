import type { Link }       from '@shared/data'
import type { Table }      from '@tanstack/react-table'
import type { SelectItem } from '@ui/select'

export interface EventsSelectProps {
  table: Table<Link>
  selectedItems: Array<SelectItem>
  onSelect: (items: Array<SelectItem>) => void
}

export interface UseEventsItemsReturn {
  eventsItems: Array<SelectItem>
  handleSelect: (items: Array<SelectItem>) => void
}
