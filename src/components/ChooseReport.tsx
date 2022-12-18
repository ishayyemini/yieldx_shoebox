import { useContext, useEffect, useState } from 'react'
import { Box, DataTable } from 'grommet'
import { useTranslation } from 'react-i18next'
import { Oval } from 'react-loader-spinner'

import API, { ReportType } from '../data/API'
import GlobalContext, { ContextType } from '../data/GlobalContext'

const ChooseReport = () => {
  const { report, updateContext } = useContext(GlobalContext)

  const [loading, toggleLoading] = useState(true)
  const [reportList, setReportList] = useState<Array<ReportType>>([])

  const { t } = useTranslation()

  useEffect(() => {
    API.getReports().then((res) => {
      toggleLoading(false)
      setReportList(res.slice().reverse() ?? [])
    })
  }, [])

  return (
    <Box fill>
      {loading ? (
        <Box align={'center'} justify={'center'} fill>
          <Oval />
        </Box>
      ) : (
        <DataTable
          columns={[
            ...[
              'Customer',
              'dateCreated',
              'BoardID',
              'DateToDB',
              'Comment',
              'Farm type',
              'Location',
              'House',
              'Union No',
              'Farm No',
              'InHouseLoc',
              'Age',
              'Broiler family',
              'Flock size',
              'Mortality',
              'Disease',
            ].map((property) => ({
              property,
              header: t(`report.${property}`),
              render: ['dateCreated', 'DateToDB'].includes(property)
                ? (datum: ReportType) => (
                    <>{new Date(datum.dateCreated).toLocaleString('en-GB')}</>
                  )
                : undefined,
            })),
          ]}
          data={reportList}
          primaryKey={'UID'}
          sort={{ property: 'dateCreated', direction: 'desc' }}
          onClickRow={({ datum }) =>
            updateContext((old: ContextType) => ({ ...old, report: datum }))
          }
          rowProps={{ [report?.UID ?? '']: { background: 'black' } }}
          sortable
          pin
        />
      )}
    </Box>
  )
}
export default ChooseReport
