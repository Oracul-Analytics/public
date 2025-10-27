import type { MultiGraph } from 'graphology'

export interface UseForceAtlas2LayoutProps {
  initialPlayTimeMs?: number
}

export interface UseForceAtlas2LayoutReturn {
  isPlayed: boolean
  toggleFA2Layout: () => void
  changeLinLogMode: (active: boolean) => void
  initFA2Layout: (graph: MultiGraph, initialPlayTimeMs?: number) => void
}
