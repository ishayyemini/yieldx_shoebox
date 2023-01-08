import { Suspense, useContext } from 'react'
import { Await, defer, Link, useLoaderData } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Card, DataTable } from 'grommet'
import * as Icons from 'grommet-icons'

import API, { DeviceType } from '../data/API'
import { Loader } from './app/AppComponents'
import GlobalContext from '../data/GlobalContext'

export const devicesInfoLoader = () => {
  return defer({ deviceList: API.getDevices() })
}

const DevicesInfo = () => {
  const data = useLoaderData() as { deviceList: DeviceType[] }
  const { deviceList } = useContext(GlobalContext)

  const { t } = useTranslation()

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={deviceList?.length ? deviceList : data.deviceList}>
        {(dv: Awaited<DeviceType[]>) =>
          dv.length ? (
            <DataTable
              columns={[
                {
                  property: 'Customer',
                  header: t('device.Customer'),
                },
                {
                  property: 'DateUpdated',
                  header: t('device.DateUpdated'),
                  render: (datum: DeviceType) =>
                    datum.DateUpdated ? (
                      <>{new Date(datum.DateUpdated).toLocaleString('en-GB')}</>
                    ) : null,
                },
                ...['Location', 'House', 'InHouseLoc'].map((property) => ({
                  property,
                  header: t(`device.${property}`),
                })),
                {
                  property: 'FW',
                  header: t('device.FW'),
                  render: (datum) => (
                    <Link to={`/manage-devices/${datum.UID}`}>{datum.FW}</Link>
                  ),
                },
                {
                  property: 'Adapters',
                  header: t('device.Adapters'),
                  render: (datum) =>
                    Object.entries(datum.Adapters).map(([key, value]) => (
                      <Box width={'max-content'} key={key}>
                        {key}: {value}
                      </Box>
                    )),
                },
                {
                  property: 'Online',
                  header: t('device.Online'),
                  render: (datum) =>
                    datum.Online ? (
                      <Box align={'center'} justify={'center'}>
                        <Icons.Beacon />
                      </Box>
                    ) : null,
                },
                ...['Cycle', 'Stage'].map((property) => ({
                  property,
                  header: t(`device.${property}`),
                })),
              ]}
              data={dv}
              primaryKey={'UID'}
              sort={{ property: 'DateUpdated', direction: 'desc' }}
              sortable
              pin
            />
          ) : (
            <Box align={'center'} justify={'center'} fill>
              <Card align={'center'} gap={'medium'}>
                {t('DevicesInfo.empty')}
              </Card>
            </Box>
          )
        }
      </Await>
    </Suspense>
  )
}

export default DevicesInfo
