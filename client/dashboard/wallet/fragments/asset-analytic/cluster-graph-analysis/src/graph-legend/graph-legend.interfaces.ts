import type { ThemeColor } from '@ui/theme'
import type { Messages }   from 'next-intl'

export interface LegendItem {
  id: string
  color: ThemeColor
  text: keyof Messages['cluster-graph-analysis']['legend']
}
