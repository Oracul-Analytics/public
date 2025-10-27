import type { Link }                 from '@shared/data'
import type { Node }                 from '@shared/data'

import type { UseGraphColorsReturn } from './use-graph-colors.interfaces.js'
import type { GraphColor }           from './use-graph-colors.interfaces.js'

import { useUnit }                   from 'effector-react'
import { useCallback }               from 'react'
import { useMemo }                   from 'react'

import { NodeType }                  from '@shared/data'
import { LinkType }                  from '@shared/data'
import { $themeTokens }              from '@ui/theme'

export const useGraphColors = (): UseGraphColorsReturn => {
  const tokens = useUnit($themeTokens)

  const colors = useMemo(
    () =>
      ({
        source: {
          color: tokens.colors['base.positive-heavy'],
          hoverColor: tokens.colors['base.positive-heavy-hover'],
          borderColor: tokens.colors['base.positive-semi-heavy'],
          hoverBorderColor: tokens.colors['base.positive-semi-heavy-hover'],
        },
        sink: {
          color: tokens.colors['base.danger-heavy'],
          hoverColor: tokens.colors['base.danger-heavy-hover'],
          borderColor: tokens.colors['base.danger-semi-heavy'],
          hoverBorderColor: tokens.colors['base.danger-semi-heavy-hover'],
        },
        active: {
          color: tokens.colors['base.info-heavy'],
          hoverColor: tokens.colors['base.info-heavy-hover'],
          borderColor: tokens.colors['base.info-semi-heavy'],
          hoverBorderColor: tokens.colors['base.info-semi-heavy-hover'],
        },
        empty: {
          color: tokens.colors['base.warning-heavy'],
          hoverColor: tokens.colors['base.warning-heavy-hover'],
          borderColor: tokens.colors['base.warning-semi-heavy'],
          hoverBorderColor: tokens.colors['base.warning-semi-heavy-hover'],
        },
      }) as const,
    [tokens]
  )

  const getNodeColors = useCallback(
    (node: Node): GraphColor => {
      if ([NodeType.Cexsell, NodeType.Dexsell].includes(node.nodeType)) {
        return colors.sink
      }

      if ([NodeType.Cexbuy, NodeType.Dexbuy, NodeType.Deployer].includes(node.nodeType)) {
        return colors.source
      }

      if (node.usdBalance === '0') {
        return colors.empty
      }

      return colors.active
    },
    [colors]
  )

  const getEdgeColors = useCallback(
    (link: Link): GraphColor => {
      if ([LinkType.Dexbuy, LinkType.Cexbuy, LinkType.Deployer].includes(link.linkType)) {
        return colors.source
      }

      if ([LinkType.Dexsell, LinkType.Cexsell].includes(link.linkType)) {
        return colors.sink
      }

      return colors.active
    },
    [colors]
  )

  return { getNodeColors, getEdgeColors }
}
