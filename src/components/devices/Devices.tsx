import { Suspense, useContext } from 'react'
import { Await, defer, Outlet, useLoaderData } from 'react-router-dom'

import { Loader } from '../app/AppComponents'
import API, { DeviceType } from '../../data/API'
import GlobalContext from '../../data/GlobalContext'

export const devicesLoader = () => {
  return defer({ deviceList: API.getDevices() })
}

const Devices = () => {
  const data = useLoaderData() as { deviceList: DeviceType[] }
  const { deviceList } = useContext(GlobalContext)

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={deviceList?.length ? deviceList : data.deviceList}>
        <Outlet />
      </Await>
    </Suspense>
  )
}

export default Devices
