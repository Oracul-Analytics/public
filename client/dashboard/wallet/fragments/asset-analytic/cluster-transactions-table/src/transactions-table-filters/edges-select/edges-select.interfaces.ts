import type { Link }       from '@shared/data'
import type { Table }      from '@tanstack/react-table'
import type { SelectItem } from '@ui/select'

export interface EdgesSelectProps {
  table: Table<Link>
  selectedItems: Array<SelectItem>
  onSelect: (items: Array<SelectItem>) => void
}

export interface UseEdgesItemsReturn {
  edgesItems: Array<SelectItem>
  handleSelect: (items: Array<SelectItem>) => void
}
