/* eslint-disable no-param-reassign */

import type { CreateSigmaInstanceProps } from './create-sigma-instance.interfaces.js'

import { debounce }                      from '@tanstack/pacer'
import Sigma                             from 'sigma'

import { EdgeType }                      from '../../use-cluster-graph.interfaces.js'
import { FOCUSED_NODE_SIZE }             from './create-sigma-instance.constants.js'
import { HOVERED_EDGE_SCALE }            from './create-sigma-instance.constants.js'
import { NODE_SIZE }                     from './create-sigma-instance.constants.js'
import { defaultSettings }               from './create-sigma-instance.constants.js'

export const createSigmaInstance = ({
  graph,
  container,
  edgeType,
  focusedNodes,
}: CreateSigmaInstanceProps): Sigma => {
  let hoveredEdge: string | undefined
  let hoveredNode: string | undefined

  const sigma = new Sigma(graph, container, {
    ...defaultSettings,
    edgeReducer: (edge, attributes): Record<string, number | string> => {
      let isExtremityHovered = false

      if (hoveredNode) {
        isExtremityHovered = graph
          .extremities(edge)
          .every((node) => node === hoveredNode || graph.areNeighbors(node, hoveredNode))
      }

      if (edge === hoveredEdge || isExtremityHovered) {
        attributes.color = attributes.hoverColor
        attributes.size *= HOVERED_EDGE_SCALE
      }

      attributes.type = edgeType.current || EdgeType.DEFAULT
      return attributes
    },
    nodeReducer: (node, attributes): Record<string, boolean | number | string> => {
      attributes.highlighted = false
      attributes.hidden = true
      attributes.size = NODE_SIZE

      if (focusedNodes.current?.length) {
        if (focusedNodes.current.some((id) => graph.areNeighbors(node, id))) {
          attributes.hidden = false
        }

        if (focusedNodes.current.some((id) => id === node)) {
          attributes.hidden = false
          attributes.size = FOCUSED_NODE_SIZE
        }
      } else {
        attributes.hidden = false
      }

      if (node === hoveredNode) {
        attributes.color = attributes.hoverColor
        attributes.borderColor = attributes.hoverBorderColor
        attributes.highlighted = true
      }

      return attributes
    },
  })

  const updateHoveredEdge = debounce(
    (edge?: string) => {
      const edgesToUpdate = [hoveredEdge, edge].filter(Boolean) as Array<string>
      const nodesToUpdate = hoveredNode ? [hoveredNode] : []

      hoveredEdge = edge

      sigma.refresh({
        skipIndexation: true,
        partialGraph: { edges: edgesToUpdate, nodes: nodesToUpdate },
      })
    },
    { wait: 100 }
  )

  const updateHoveredNode = (node?: string): void => {
    const nodesToUpdate = [hoveredNode, node].filter(Boolean) as Array<string>
    const hoveredNodeEdges = hoveredNode ? graph.edges(hoveredNode) : []
    const nodeEdges = node ? graph.edges(node) : []
    const edgesToUpdate = [hoveredEdge, ...hoveredNodeEdges, ...nodeEdges].filter(
      Boolean
    ) as Array<string>

    hoveredNode = node

    sigma.refresh({
      skipIndexation: true,
      partialGraph: { edges: edgesToUpdate, nodes: nodesToUpdate },
    })
  }

  sigma.on('enterEdge', ({ edge }) => {
    updateHoveredEdge(edge)
  })

  sigma.on('leaveEdge', () => {
    updateHoveredEdge(undefined)
  })

  sigma.on('enterNode', ({ node }) => {
    updateHoveredNode(node)
  })

  sigma.on('leaveNode', () => {
    updateHoveredNode(undefined)
  })

  return sigma
}
