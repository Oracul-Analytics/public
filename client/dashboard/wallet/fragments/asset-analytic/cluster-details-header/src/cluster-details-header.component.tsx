import type { ReactNode }    from 'react'

import { useTranslations }   from 'next-intl'

import { CopyButton }        from '@shared/buttons'
import { ExportButton }      from '@shared/buttons'
import { Condition }         from '@ui/condition'
import { Box }               from '@ui/layout'
import { useClusterDetails } from '@shared/hooks'

import { BackButton }        from './back-button/index.js'
import { ClusterInfo }       from './cluster-info/index.js'
import { ClusterStats }      from './cluster-stats/index.js'

export const ClusterDetailsHeader = (): ReactNode => {
  const t = useTranslations('cluster-details')
  const { cluster, isClusterLoading, isError } = useClusterDetails()

  return (
    <Box
      width='$full'
      minHeight='140px'
      gap='$2xl'
      paddingTop='$4xl'
      paddingBottom='$9xl'
      backgroundColor='$base.float'
      paddingX='$4xl'
      overflowX='auto'
      overflowY='hidden'
      borderBottom='$line.generic'
    >
      <BackButton />
      <Condition match={!isError}>
        <ClusterInfo cluster={cluster} isLoading={isClusterLoading} />
        <ClusterStats cluster={cluster} isLoading={isClusterLoading} />
        <Box gap='$13xs' alignItems='center'>
          <ExportButton
            size='small'
            exportValue={cluster}
            fileName={`cluster-${cluster?.clusterId}`}
            loading={isClusterLoading}
          >
            {t('download')}
          </ExportButton>
          <CopyButton copyText={JSON.stringify(cluster, null, 2)} loading={isClusterLoading}>
            {t('copy')}
          </CopyButton>
        </Box>
      </Condition>
    </Box>
  )
}
