import { useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import GlobalContext from '../../data/GlobalContext'
import API, { ReportDataType } from '../../data/API'
import { ProgressLoader } from '../app/AppComponents'
import { Box, Card, Text } from 'grommet'

const ReportView = () => {
  const { UID } = useParams() as { UID: string }
  const { reportList } = useContext(GlobalContext)

  const [loadStatus, setLoadStatus] = useState<{
    status: 'Loading' | 'Fetching' | 'Done' | 'Error'
    rowsFetched: number
    rowsTotal: number
    seconds: number
  }>({ status: 'Loading', rowsFetched: 0, rowsTotal: 0, seconds: 0 })
  const [rows, setRows] = useState<ReportDataType[] | undefined>()

  const { t } = useTranslation(undefined, { keyPrefix: 'ReportView' })

  const report = useMemo(
    () => reportList?.find((item) => item.UID === UID),
    [UID, reportList]
  )

  useEffect(() => {
    if (!rows)
      API.getReportData(UID, setLoadStatus)
        .then((res) => setRows(res))
        .catch(() => setLoadStatus((old) => ({ ...old, status: 'Error' })))
  }, [UID, rows])

  return (
    <>
      {loadStatus.status === 'Done' ? (
        <>
          Current report: {report?.UID}
          <br />
          We have {rows?.length} rows
        </>
      ) : null}

      {['Loading', 'Fetching'].includes(loadStatus.status) ? (
        <ProgressLoader
          downloading={
            loadStatus.status === 'Fetching' && loadStatus.rowsFetched > 0
          }
          percentage={Math.floor(
            (loadStatus.rowsFetched / loadStatus.rowsTotal) * 100
          )}
          seconds={loadStatus.seconds}
        />
      ) : null}

      {loadStatus.status === 'Error' ? (
        <Box align={'center'} justify={'center'} fill>
          <Card width={{ max: '300px' }}>
            <Text textAlign={'center'}>{t('fetchError')}</Text>
          </Card>
        </Box>
      ) : null}
    </>
  )
}

export default ReportView
