import type { ReactNode }         from 'react'

import { useTranslations }        from 'next-intl'

import { Checkbox }               from '@ui/checkbox'
import { Condition }              from '@ui/condition'
import { Box }                    from '@ui/layout'
import { useClusterDetails }      from '@shared/hooks'

import { LOAD_GRAPH_TIME_MS }     from '../hooks/index.js'
import { GraphError }             from './graph-error/index.js'
import { GraphLoading }           from './graph-loading/index.js'
import { PlayGraphLayoutButton }  from './play-graph-layout-button/index.js'
import { SelectedEdgesContainer } from './selected-edges-container/index.js'
import { SelectedNodeContainer }  from './selected-node-container/index.js'
import { useGraphLoading }        from '../hooks/index.js'
import { useClusterGraph }        from '../hooks/index.js'

export const GraphContainer = (): ReactNode => {
  const t = useTranslations('cluster-graph-analysis')
  const { isLoading } = useGraphLoading({ loadingTimeMs: LOAD_GRAPH_TIME_MS })
  const { isError } = useClusterDetails()

  const {
    isPlayed,
    selectedEdges,
    selectedNode,
    graphContainer,
    toggleFA2Layout,
    handleChangeEdgeType,
    handleChangeLinLogMode,
  } = useClusterGraph()

  return (
    <>
      <Condition match={isError}>
        <GraphError />
      </Condition>
      <Condition match={!!isLoading && !isError}>
        <GraphLoading />
      </Condition>
      <Condition match={!isLoading && !isError}>
        <Box
          flexDirection='column'
          gap='$3xs'
          alignItems='end'
          position='absolute'
          top='$7xs'
          right='$7xs'
          zIndex='$bottom.default'
        >
          <PlayGraphLayoutButton isPlayed={isPlayed} onClick={toggleFA2Layout} />
          <Checkbox label={t('lin-log-mode')} onCheck={handleChangeLinLogMode} />
          <Checkbox label={t('edge-size-1px')} onCheck={handleChangeEdgeType} />
        </Box>
      </Condition>
      <Box
        ref={graphContainer}
        fill
        overflow='hidden'
        position='relative'
        opacity={isLoading || isError ? '$zero' : '$full'}
      >
        <Condition match={!!selectedNode || !!selectedEdges?.length}>
          <Box
            position='absolute'
            flexDirection='column'
            gap='$md'
            top='$7xs'
            left='$7xs'
            zIndex='$bottom.default'
          >
            <Condition match={!!selectedNode}>
              <SelectedNodeContainer node={selectedNode} />
            </Condition>
            <Condition match={!!selectedEdges?.length}>
              <SelectedEdgesContainer edges={selectedEdges} />
            </Condition>
          </Box>
        </Condition>
      </Box>
    </>
  )
}
