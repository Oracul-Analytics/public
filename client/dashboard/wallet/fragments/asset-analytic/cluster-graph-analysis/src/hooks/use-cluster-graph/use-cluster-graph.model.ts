import type { Link }       from '@shared/data'
import type { Node }       from '@shared/data'

import type { GraphColor } from '../use-graph-colors/index.js'

import { MultiGraph }      from 'graphology'

import { addEdgeToGraph }  from './utils/index.js'
import { addNodeToGraph }  from './utils/index.js'
import { getEdgeId }       from './utils/index.js'

export class ClusterGraphModel {
  #graph: MultiGraph = new MultiGraph()

  #nodes = new Map<string, Node>()

  #edges = new Map<string, Link>()

  get graph(): MultiGraph {
    return this.#graph
  }

  setGraph(graph: MultiGraph, nodes: Array<Node>, edges: Array<Link>): void {
    this.#graph = graph
    this.#nodes = new Map(nodes.map((node) => [node.walletAddress, node]))
    this.#edges = new Map(edges.map((edge) => [getEdgeId(edge), edge]))
  }

  update(
    nodes: Array<Node>,
    edges: Array<Link>,
    getNodeAttrs: (node: Node) => GraphColor,
    getEdgeAttrs: (edge: Link) => GraphColor
  ): void {
    const nextNodes = new Map(nodes.map((node) => [node.walletAddress, node]))
    const nextEdges = new Map(edges.map((edge) => [getEdgeId(edge), edge]))

    this.#nodes.forEach((node, id) => {
      if (!nextNodes.has(id)) {
        if (this.#graph.hasNode(node.id)) this.#graph.dropNode(node.id)
        this.#nodes.delete(id)
      }
    })

    nextNodes.forEach((node, id) => {
      addNodeToGraph(node, getNodeAttrs(node), this.#graph)
      this.#nodes.set(id, node)
    })

    this.#edges.forEach((edge, id) => {
      if (!nextEdges.has(id)) {
        if (this.#graph.hasEdge(id)) this.#graph.dropEdge(id)
        this.#edges.delete(id)
      }
    })

    nextEdges.forEach((edge, id) => {
      addEdgeToGraph(edge, getEdgeAttrs(edge), this.#graph)
      this.#edges.set(id, edge)
    })
  }
}
