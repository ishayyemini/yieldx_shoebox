import { useContext } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Card, DataTable } from 'grommet'
import * as Icons from 'grommet-icons'

import { DeviceType } from '../../data/API'
import GlobalContext from '../../data/GlobalContext'
import { CollapsibleSide } from '../app/AppComponents'

const DevicesInfo = () => {
  const { MAC } = useParams() as { MAC?: string }
  const { deviceList } = useContext(GlobalContext)

  const { t } = useTranslation()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Box style={{ position: 'relative' }} direction={'row'} fill>
      <Box fill={'vertical'} basis={'200px'} flex={'grow'} overflow={'auto'}>
        {deviceList?.length ? (
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
                    <>{new Date(datum.DateUpdated).toLocaleString()}</>
                  ) : null,
              },
              ...['Location', 'House', 'InHouseLoc', 'FW'].map((property) => ({
                property,
                header: t(`device.${property}`),
              })),
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
            data={deviceList}
            onClickRow={({ datum }) =>
              pathname.endsWith(datum.MAC)
                ? navigate('/devices')
                : navigate(datum.MAC)
            }
            rowProps={{ [MAC ?? '']: { background: 'var(--primary)' } }}
            primaryKey={'MAC'}
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
        )}
      </Box>

      <CollapsibleSide open={!pathname.endsWith('/devices')}>
        <Outlet />
      </CollapsibleSide>
    </Box>
  )
}

export default DevicesInfo
