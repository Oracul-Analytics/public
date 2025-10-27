import type { RefObject } from 'react'

export interface UseFocusedWalletReturn {
  focusedWallet: string | null
  setFocusedWallet: (
    value: string | ((old: string | null) => string | null) | null
  ) => Promise<URLSearchParams>
  focusedNodesRef: RefObject<Array<string>>
}
