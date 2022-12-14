import { useContext, useEffect, useState } from 'react'
import { Box, Select } from 'grommet'

import API from '../data/API'
import GlobalContext from '../data/GlobalContext'

const ChooseReport = () => {
  const { report, updateContext } = useContext(GlobalContext)

  const [reportList, setReportList] = useState([])

  useEffect(() => {
    API.getReports().then((res) => setReportList(res.slice().reverse() ?? []))
  }, [])

  console.log(report?.Customer)

  return (
    <Box>
      Hey
      <Select
        options={reportList}
        value={report}
        onChange={({ option }) =>
          updateContext((old) => ({ ...old, report: option }))
        }
        labelKey={'dateCreated'}
        valueKey={'UID'}
      />
      Customer: {report?.Customer}
    </Box>
  )
}

export default ChooseReport
