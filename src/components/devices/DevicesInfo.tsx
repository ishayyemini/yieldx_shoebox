import { useContext, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Button, Card, CheckBox, DataTable, Select, Text } from 'grommet'
import * as Icons from 'grommet-icons'

import API, { DeviceType } from '../../data/API'
import GlobalContext from '../../data/GlobalContext'
import { CollapsibleSide } from '../app/AppComponents'

const DevicesInfo = () => {
  const { MAC } = useParams() as { MAC?: string }
  const { deviceList, otaList } = useContext(GlobalContext)

  const [devices, setDevices] = useState<string[]>([])
  const [open, setOpen] = useState<boolean | string>(false)
  const [version, setVersion] = useState<string>()

  const { t } = useTranslation()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    API.getOTAList().then()
  }, [])

  useEffect(() => {
    if (devices.length) setOpen((prevOpen) => prevOpen || true)
    else setOpen(false)
  }, [devices])

  return (
    <Box direction={'row'} fill>
      <Box fill={'vertical'} basis={'200px'} flex={'grow'} overflow={'auto'}>
        {deviceList?.length ? (
          <DataTable
            columns={[
              {
                property: 'select',
                header: t('DevicesInfo.update'),
                render: (datum: DeviceType) => (
                  <Box align={'center'}>
                    <CheckBox
                      checked={devices.includes(datum.MAC)}
                      onChange={(e) => {
                        setDevices((prevDevices) =>
                          e.target.checked
                            ? [datum.MAC, ...prevDevices]
                            : prevDevices.filter((item) => item !== datum.MAC)
                        )
                      }}
                    />
                  </Box>
                ),
              },
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
            onClickRow={(e) => {
              if (!(e.target instanceof HTMLInputElement)) {
                if (pathname.endsWith(e.datum.MAC)) navigate('/devices')
                else navigate(e.datum.MAC)
              }
            }}
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

      <CollapsibleSide open={open} direction={'row'}>
        <Button
          icon={open === '48px' ? <Icons.Previous /> : <Icons.Next />}
          onClick={() =>
            setOpen((prevOpen) => (prevOpen === '48px' ? true : '48px'))
          }
          style={{ padding: '12px' }}
          plain
        />
        <Box
          align={'center'}
          justify={'center'}
          gap={'small'}
          pad={'small'}
          overflow={'hidden'}
        >
          <Text weight={'bold'}>{t('DevicesInfo.chooseFile')}</Text>
          <Select
            value={version}
            options={otaList ?? []}
            onChange={({ option }) => setVersion(option)}
          />
          <Text weight={'bold'}>{t('DevicesInfo.willUpdate')}</Text>
          <Box overflow={'auto'}>
            {devices.map((item) => (
              <Box margin={'1px 5px'} border={'bottom'} flex={false} key={item}>
                {item}
              </Box>
            ))}
          </Box>
          <Button label={t('DevicesInfo.pushUpdate')} primary />
        </Box>
      </CollapsibleSide>

      <Outlet />
    </Box>
  )
}

export default DevicesInfo
