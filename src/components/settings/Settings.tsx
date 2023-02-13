import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Card, Form, Text } from 'grommet'
import { useTranslation } from 'react-i18next'
import { useLoaderData } from 'react-router-dom'

import { Loader, TextField } from '../app/AppComponents'
import API from '../../data/API'

export const settingsLoader = () => {
  const address = localStorage.getItem('mqttAddress') ?? ''
  const mqttServer =
    address.match(/(?<=:\/\/).+(?=:)/)?.[0] ?? 'broker.mqttdashboard.com'
  const mqttPort = Number(address.match(/([^:]\d*)$/)?.[0] ?? '1883')
  return { mqttServer, mqttPort }
}

const Settings = () => {
  const { mqttServer, mqttPort } = useLoaderData() as {
    mqttServer: string
    mqttPort: number
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { mqttServer, mqttPort } })

  const { t } = useTranslation(undefined, { keyPrefix: 'Settings' })

  const onSubmit = useCallback<
    (values: { mqttServer: string; mqttPort: number }) => Promise<void>
  >(async (values) => {
    await API.saveSettings(values)
  }, [])

  return (
    <Box justify={'center'} align={'center'} fill>
      <Card>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Box gap={'small'}>
            <Box gap={'small'} pad={{ bottom: 'small' }} border={'bottom'}>
              <Text weight={'bold'}>{t('mqtt')}</Text>
              <TextField
                {...register('mqttServer')}
                label={t('mqttServer')}
                error={errors.mqttServer?.message}
              />
              <TextField
                {...register('mqttPort', {
                  setValueAs: (value) => Number(value),
                })}
                label={t('mqttPort')}
                error={errors.mqttPort?.message}
              />
            </Box>

            <Button
              label={t('save')}
              alignSelf={'center'}
              type={'submit'}
              primary
            />
          </Box>
        </Form>
      </Card>

      {isSubmitting ? <Loader full /> : null}
    </Box>
  )
}

export default Settings
