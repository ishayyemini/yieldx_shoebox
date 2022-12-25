import { useContext } from 'react'
import { Box, DataTable } from 'grommet'
import { useTranslation } from 'react-i18next'

import { ReportType } from '../data/API'
import GlobalContext from '../data/GlobalContext'

const ChooseReport = () => {
  const { report, reportList, updateContext } = useContext(GlobalContext)

  const { t } = useTranslation()

  return (
    <Box fill>
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
          updateContext((old) => ({ ...old, report: datum }))
        }
        rowProps={{ [report?.UID ?? '']: { background: 'black' } }}
        sortable
        pin
      />
    </Box>
  )
}
export default ChooseReport
