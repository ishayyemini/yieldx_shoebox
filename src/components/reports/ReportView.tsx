import { Suspense, useContext, useMemo } from 'react'
import {
  Await,
  defer,
  LoaderFunction,
  useLoaderData,
  useParams,
} from 'react-router-dom'
import { Text } from 'grommet'
import { useTranslation } from 'react-i18next'

import GlobalContext from '../../data/GlobalContext'
import API, { ReportDataType } from '../../data/API'
import { Loader } from '../app/AppComponents'

export const reportViewLoader: LoaderFunction = ({ params: { UID } }) => {
  if (UID) return defer({ reportData: API.getReportData(UID) })
  else return { reportData: {} }
}

const ReportView = () => {
  const { UID } = useParams() as { UID: string }
  const { reportData } = useLoaderData() as { reportData?: ReportDataType }
  const { reportList } = useContext(GlobalContext)

  const { t } = useTranslation(undefined, { keyPrefix: 'ReportView' })

  const report = useMemo(
    () => reportList?.find((item) => item.UID === UID),
    [UID, reportList]
  )

  console.log(report)

  return (
    <Suspense fallback={<Loader size={'50px'} />}>
      <Await resolve={reportData} errorElement={null}>
        {({ dateCreated }: ReportDataType) =>
          dateCreated ? <>test</> : <Text>{t('empty')}</Text>
        }
      </Await>
    </Suspense>
  )
}

export default ReportView
