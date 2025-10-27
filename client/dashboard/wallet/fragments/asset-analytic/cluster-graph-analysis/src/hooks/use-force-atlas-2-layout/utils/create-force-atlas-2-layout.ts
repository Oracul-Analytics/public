import type { MultiGraph }                  from 'graphology'
import type { ForceAtlas2Settings }         from 'graphology-layout-forceatlas2'

import type { FA2LayoutSupervisorInstance } from './create-layout-supervisor.js'

import { inferSettings }                    from 'graphology-layout-forceatlas2'

import { FA2LayoutSupervisor }              from './create-layout-supervisor.js'

export const createFA2Layout = (
  graph: MultiGraph,
  settings?: ForceAtlas2Settings
): FA2LayoutSupervisorInstance => {
  const sensibleSettings = inferSettings(graph)

  return new FA2LayoutSupervisor(graph, {
    settings: {
      ...sensibleSettings,
      gravity: 0.5,
      slowDown: 30,
      ...settings,
    },
  })
}
