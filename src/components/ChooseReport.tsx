import { Suspense, useContext } from 'react'
import { Box, Card, DataTable } from 'grommet'
import { useTranslation } from 'react-i18next'
import { Await, defer, useLoaderData, useNavigation } from 'react-router-dom'

import API, { ReportType } from '../data/API'
import GlobalContext from '../data/GlobalContext'
import { Loader } from './app/AppComponents'

export const chooseReportLoader = () => {
  return defer({ reportList: API.getReports() })
}

const ChooseReport = () => {
  const data = useLoaderData() as { reportList: ReportType[] }
  const { report, updateContext } = useContext(GlobalContext)

  const { t } = useTranslation()

  const navigation = useNavigation()
  console.log(navigation.state)

  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={data.reportList}
        errorElement={<p>Error loading package location!</p>}
      >
        {(reportList) =>
          reportList?.length ? (
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
                        <>
                          {new Date(datum.dateCreated).toLocaleString('en-GB')}
                        </>
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
          ) : (
            <Box align={'center'} justify={'center'} fill>
              <Card align={'center'} gap={'medium'}>
                {t('ChooseReport.empty')}
                {/*<Button label={t('signOut')} onClick={signOut} secondary />*/}
              </Card>
            </Box>
          )
        }
      </Await>
    </Suspense>
  )
}
export default ChooseReport
