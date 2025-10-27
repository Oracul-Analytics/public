import type { Messages } from 'next-intl'

export interface TranslatedHeaderProps {
  id: keyof Messages['cluster-transactions-table']['columns']
}
