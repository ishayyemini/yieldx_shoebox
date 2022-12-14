import { useContext, useEffect, useState } from 'react'
import { Box, Card, DataTable } from 'grommet'
import { useTranslation } from 'react-i18next'
import { Oval } from 'react-loader-spinner'

import API from '../data/API'
import GlobalContext from '../data/GlobalContext'
import type { ReportType } from '../data/API'

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
    <Card margin={'medium'} background={'yellow'} fill>
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
                ? (datum) => new Date(datum.dateCreated).toLocaleString('en-GB')
                : null,
            })),
          ]}
          data={reportList}
          primaryKey={'UID'}
          sort={{ property: 'dateCreated', direction: 'desc' }}
          onClickRow={({ datum }) =>
            updateContext((old) => ({ ...old, report: datum }))
          }
          rowProps={{ [report?.UID]: { background: 'black' } }}
          sortable
        />
      )}
    </Card>
  )
}
export default ChooseReport
