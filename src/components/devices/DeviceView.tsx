import { Suspense, useContext, useMemo } from 'react'
import {
  Await,
  defer,
  LoaderFunction,
  useLoaderData,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { Box, Button, Text } from 'grommet'
import { useTranslation } from 'react-i18next'
import * as Icons from 'grommet-icons'

import GlobalContext from '../../data/GlobalContext'
import API, { LastSensorsType } from '../../data/API'
import { Loader } from '../app/AppComponents'

export const deviceViewLoader: LoaderFunction = async (args) => {
  if (args.params.MAC) {
    return defer({ lastSensors: API.getLastSensors(args.params.MAC) })
  } else return null
}

const DeviceView = () => {
  const { MAC } = useParams() as { MAC: string }
  const { lastSensors } = useLoaderData() as { lastSensors: LastSensorsType }
  const { deviceList } = useContext(GlobalContext)

  const { t } = useTranslation(undefined, { keyPrefix: 'DeviceView' })

  const navigate = useNavigate()

  const device = useMemo(
    () => deviceList?.find((item) => item.MAC === MAC),
    [MAC, deviceList]
  )

  return (
    <Box fill={'vertical'} basis={'400px'} border={'left'}>
      <Button
        icon={<Icons.Close />}
        onClick={() => navigate('/devices')}
        style={{ padding: '12px' }}
        plain
      />
      <Box align={'center'}>
        <Box
          margin={{ bottom: 'small' }}
          pad={{ bottom: 'small' }}
          border={'bottom'}
          fill={'horizontal'}
          flex={false}
        >
          <Text textAlign={'center'}>
            {t('MAC')}: {device?.MAC ?? null}
          </Text>
        </Box>
        <Suspense fallback={<Loader size={'50px'} />}>
          <Await resolve={lastSensors} errorElement={null}>
            {({ UID, ...data }: LastSensorsType) =>
              UID ? (
                <>
                  <Text weight={'bold'} margin={{ bottom: 'small' }}>
                    {t('lastReport')}
                  </Text>
                  {Object.entries(data).map(([key, value]) =>
                    value ? (
                      <Text key={key}>
                        {t(key)}:{' '}
                        {key === 'Time'
                          ? new Date(value).toLocaleString()
                          : value.toLocaleString()}
                        {key === 'Humidity' ? '%' : ''}
                        {key === 'Temperature' ? '°C' : ''}
                      </Text>
                    ) : null
                  )}
                </>
              ) : (
                <Text>{t('empty')}</Text>
              )
            }
          </Await>
        </Suspense>
      </Box>
    </Box>
  )
}

export default DeviceView
