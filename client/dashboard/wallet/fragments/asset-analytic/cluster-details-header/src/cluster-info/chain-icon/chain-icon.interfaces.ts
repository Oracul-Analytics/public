import type { IconProps } from '@ui/icons'
import type { ReactNode } from 'react'

export interface ChainIconProps {
  network: string | undefined
}

export interface ChainItem {
  text: string
  Icon: (props: IconProps) => ReactNode
}
