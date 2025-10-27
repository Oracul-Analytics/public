import type { MultiGraph }                  from 'graphology'

import type { UseForceAtlas2LayoutReturn }  from './use-force-atlas-2-layout.interfaces.js'
import type { FA2LayoutSupervisorInstance } from './utils/index.js'

import { useState }                         from 'react'
import { useRef }                           from 'react'

import { createFA2Layout }                  from './utils/index.js'

export const useForceAtlas2Layout = (): UseForceAtlas2LayoutReturn => {
  const [isPlayed, setIsPlayed] = useState<boolean>(false)
  const fA2DefaultLayoutRef = useRef<FA2LayoutSupervisorInstance>(null)
  const fA2LinLogModeLayoutRef = useRef<FA2LayoutSupervisorInstance>(null)
  const linLogMode = useRef<boolean>(false)

  const changeLinLogMode = (active: boolean): void => {
    linLogMode.current = active

    if (!isPlayed) {
      return
    }

    if (linLogMode.current) {
      fA2DefaultLayoutRef.current?.stop()
      fA2LinLogModeLayoutRef.current?.start()
    } else {
      fA2LinLogModeLayoutRef.current?.stop()
      fA2DefaultLayoutRef.current?.start()
    }
  }

  const toggleFA2Layout = (): void => {
    setIsPlayed((prev) => {
      const newIsPlayed = !prev

      if (!newIsPlayed) {
        fA2DefaultLayoutRef.current?.stop()
        fA2LinLogModeLayoutRef.current?.stop()
        return newIsPlayed
      }

      if (linLogMode.current) {
        fA2LinLogModeLayoutRef.current?.start()
      } else {
        fA2DefaultLayoutRef.current?.start()
      }

      return newIsPlayed
    })
  }

  const initFA2Layout = (graph: MultiGraph, initialPlayTimeMs?: number): void => {
    fA2DefaultLayoutRef.current = createFA2Layout(graph)
    fA2LinLogModeLayoutRef.current = createFA2Layout(graph, { linLogMode: true })

    if (initialPlayTimeMs !== undefined) {
      fA2DefaultLayoutRef.current.start()

      setTimeout(() => {
        fA2DefaultLayoutRef.current?.stop()
      }, initialPlayTimeMs)
    }
  }

  return { isPlayed, initFA2Layout, toggleFA2Layout, changeLinLogMode }
}
