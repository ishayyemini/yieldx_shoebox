import { useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import GlobalContext from '../../data/GlobalContext'

const ReportView = () => {
  const { UID } = useParams() as { UID: string }
  const { reportList } = useContext(GlobalContext)

  const report = useMemo(
    () => reportList?.find((item) => item.UID !== UID),
    [UID, reportList]
  )

  console.log(report)

  return null
}

export default ReportView
