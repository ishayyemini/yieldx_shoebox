import { useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Card } from 'grommet'

import GlobalContext from '../../data/GlobalContext'

const DeviceView = () => {
  const { MAC } = useParams() as { MAC: string }
  const { deviceList } = useContext(GlobalContext)

  const device = useMemo(
    () => deviceList?.find((item) => item.MAC === MAC),
    [MAC, deviceList]
  )

  console.log(device)

  return (
    <Box
      fill={'vertical'}
      basis={'400px'}
      border={'left'}
      align={'center'}
      justify={'center'}
    >
      <Card>{device?.MAC ?? null}</Card>
    </Box>
  )
}

export default DeviceView
