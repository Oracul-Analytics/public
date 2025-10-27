import type { UseGraphLoadingProps }  from './use-graph-loading.interfaces.js'
import type { UseGraphLoadingReturn } from './use-graph-loading.interfaces.js'

import { useEffect }                  from 'react'
import { useState }                   from 'react'
import { useRef }                     from 'react'

import { useClusterDetails }          from '@shared/hooks'

export const useGraphLoading = ({ loadingTimeMs }: UseGraphLoadingProps): UseGraphLoadingReturn => {
  const [graphIsLoading, setGraphIsLoading] = useState<boolean>(true)
  const timerRef = useRef<NodeJS.Timeout>(undefined)

  const { isLoading } = useClusterDetails()

  useEffect(() => {
    if (!isLoading) {
      timerRef.current = setTimeout(() => {
        setGraphIsLoading(isLoading)
      }, loadingTimeMs)
    }
    return (): void => {
      clearTimeout(timerRef.current)
    }
  }, [isLoading, loadingTimeMs])

  return { isLoading: graphIsLoading }
}
