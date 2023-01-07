import { useEffect } from 'react'

import API from '../data/API'

const DevicesInfo = () => {
  useEffect(() => {
    API.getDevices().then((r) => console.log(r))
  }, [])

  return null
}

export default DevicesInfo
