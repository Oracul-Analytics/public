import type { LegendItem } from './graph-legend.interfaces.js'

export const legendItems: Array<LegendItem> = [
  {
    id: 'legend-sources',
    text: 'sources',
    color: '$base.positive-heavy',
  },
  {
    id: 'legend-sinks',
    text: 'sinks',
    color: '$base.danger-heavy',
  },
  {
    id: 'legend-active',
    text: 'active',
    color: '$base.info-heavy',
  },
  {
    id: 'legend-empty',
    text: 'empty',
    color: '$base.warning-heavy',
  },
]
