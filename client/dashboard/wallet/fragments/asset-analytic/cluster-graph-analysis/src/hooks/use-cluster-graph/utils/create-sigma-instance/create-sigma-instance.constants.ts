import type { Settings }           from 'sigma/settings'

import { createNodeBorderProgram } from '@sigma/node-border'
import { EdgeLineProgram }         from 'sigma/rendering'
import { EdgeRectangleProgram }    from 'sigma/rendering'

import { EdgeType }                from '../../use-cluster-graph.interfaces.js'

export const HOVERED_EDGE_SCALE = 2

export const EDGE_SIZE = 2

export const NODE_SIZE = 8

export const FOCUSED_NODE_SIZE = 16

export const defaultSettings: Partial<Settings> = {
  defaultNodeType: 'bordered',
  defaultDrawNodeHover: () => undefined,
  maxCameraRatio: 3,
  nodeProgramClasses: {
    bordered: createNodeBorderProgram({
      borders: [
        {
          size: { attribute: 'borderSize', defaultValue: 0.65 },
          color: { attribute: 'borderColor' },
        },
        {
          size: { fill: true },
          color: { attribute: 'color' },
        },
      ],
    }),
  },
  defaultEdgeType: EdgeType.DEFAULT,
  edgeProgramClasses: {
    [EdgeType.DEFAULT]: EdgeRectangleProgram,
    [EdgeType.FAST]: EdgeLineProgram,
  },
  enableEdgeEvents: true,
}
