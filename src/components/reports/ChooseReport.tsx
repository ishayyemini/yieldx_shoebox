import { useContext } from 'react'
import { Box, Card, DataTable } from 'grommet'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ReportType } from '../../data/API'
import GlobalContext from '../../data/GlobalContext'

const ChooseReport = () => {
  const { report, reportList } = useContext(GlobalContext)

  const { t } = useTranslation()

  const navigate = useNavigate()

  return reportList?.length ? (
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
      onClickRow={({ datum }) => navigate(datum.UID, { state: datum })}
      rowProps={{ [report?.UID ?? '']: { background: 'black' } }}
      sortable
      pin
    />
  ) : (
    <Box align={'center'} justify={'center'} fill>
      <Card align={'center'} gap={'medium'}>
        {t('ChooseReport.empty')}
      </Card>
    </Box>
  )
}

export default ChooseReport
