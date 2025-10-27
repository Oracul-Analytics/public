import type { ReactNode } from 'react'

import nextDynamic        from 'next/dynamic.js'

import { Box }            from '@ui/layout'
import { Column }         from '@ui/layout'
import { graphBg }        from '@ui/images'

import { GraphHeader }    from './graph-header/index.js'
import { GraphLegend }    from './graph-legend/index.js'

const dynamic = 'default' in nextDynamic ? nextDynamic.default : nextDynamic

const GraphContainer = dynamic(
  async () => import('./graph-container/index.js').then((module) => module.GraphContainer),
  { ssr: false }
)

export const ClusterGraphAnalysis = (): ReactNode => (
  <Column minHeight='auto' height='auto' gap='$md' paddingX='$9xl'>
    <GraphHeader />
    <Box
      width='$full'
      minHeight='728px'
      flexDirection='column'
      borderCollapse='collapse'
      borderRadius='$xl'
      border='$line.generic'
      background='$base.float'
      justifyContent='flex-end'
      overflow='hidden'
    >
      <Box
        fill
        backgroundImage={`url(${graphBg.src})`}
        backgroundRepeat='repeat'
        backgroundSize='auto'
        position='relative'
      >
        <GraphContainer />
      </Box>
      <GraphLegend />
    </Box>
  </Column>
)
