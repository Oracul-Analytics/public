import type { SelectedEdge } from '../selected-edges-container.interfaces.js'

export interface UseSelectedItemsProps {
  edges?: Array<SelectedEdge>
}

export interface SelectedItemStat {
  text: string
  value?: string
}

export interface SelectedItem {
  id: number | string
  title: string
  stats: Array<SelectedItemStat>
}

export interface UseSelectedItemsReturn {
  items: Array<SelectedItem>
}
