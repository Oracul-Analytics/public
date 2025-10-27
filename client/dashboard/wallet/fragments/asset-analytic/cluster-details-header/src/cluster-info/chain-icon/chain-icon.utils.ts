import { Chain } from '@shared/data'

export const isChainEnum = (network: string): network is Chain =>
  Object.values(Chain).includes(network as Chain)
