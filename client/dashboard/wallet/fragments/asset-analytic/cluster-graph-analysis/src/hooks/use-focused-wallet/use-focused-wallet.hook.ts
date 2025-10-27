import type { UseFocusedWalletReturn } from './use-focused-wallet.interfaces.js'

import { useQueryState }               from 'nuqs'
import { useEffect }                   from 'react'
import { useRef }                      from 'react'

import { useClusterDetails }           from '@shared/hooks'

export const useFocusedWallet = (): UseFocusedWalletReturn => {
  const [searchWallet] = useQueryState('searchWallet')
  const [focusedWallet, setFocusedWallet] = useQueryState('focusedWallet', {
    defaultValue: searchWallet || '',
  })
  const { nodes, isLoading } = useClusterDetails()
  const focusedNodesRef = useRef<Array<string>>([])

  useEffect(() => {
    const normalizedFocusedWallet = focusedWallet.toLowerCase().trim()

    focusedNodesRef.current = nodes.reduce<Array<string>>((acc, node) => {
      if (node.walletAddress.toLowerCase().trim() === normalizedFocusedWallet) {
        acc.push(node.id)
      }

      return acc
    }, [])
  }, [focusedWallet, isLoading])

  return { focusedWallet, setFocusedWallet, focusedNodesRef }
}
