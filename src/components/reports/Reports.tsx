import { Await, defer, Outlet, useLoaderData } from 'react-router-dom'
import { Loader } from '../app/AppComponents'
import API, { ReportType } from '../../data/API'
import { Suspense, useContext } from 'react'
import GlobalContext from '../../data/GlobalContext'

export const reportsLoader = () => {
  return defer({ reportList: API.getReports() })
}

const Reports = () => {
  const data = useLoaderData() as { reportList: ReportType[] }
  const { reportList } = useContext(GlobalContext)

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={reportList?.length ? reportList : data.reportList}>
        <Outlet />
      </Await>
    </Suspense>
  )
}

export default Reports
