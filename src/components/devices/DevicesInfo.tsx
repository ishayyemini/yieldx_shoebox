import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Card, DataTable } from 'grommet'
import * as Icons from 'grommet-icons'

import { DeviceType } from '../../data/API'
import GlobalContext from '../../data/GlobalContext'

const DevicesInfo = () => {
  const { deviceList } = useContext(GlobalContext)

  const { t } = useTranslation()

  return deviceList?.length ? (
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
            <Link to={`/devices/${datum.MAC}/update`}>{datum.FW}</Link>
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
      data={deviceList}
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
  )
}

export default DevicesInfo
