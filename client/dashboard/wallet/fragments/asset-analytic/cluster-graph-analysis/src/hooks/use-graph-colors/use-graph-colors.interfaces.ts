import type { Link } from '@shared/data'
import type { Node } from '@shared/data'

export interface GraphColor {
  color: string
  hoverColor: string
  borderColor: string
}

export interface UseGraphColorsReturn {
  getNodeColors: (node: Node) => GraphColor
  getEdgeColors: (link: Link) => GraphColor
}
