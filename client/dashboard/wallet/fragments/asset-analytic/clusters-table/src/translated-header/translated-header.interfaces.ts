import type { Messages } from 'next-intl'

export interface TranslatedHeaderProps {
  id: keyof Messages['clusters-table']['columns']
}
