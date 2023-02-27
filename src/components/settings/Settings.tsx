import { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, Card, Form, Text } from 'grommet'
import { useTranslation } from 'react-i18next'

import { Loader, TextField } from '../app/AppComponents'
import API from '../../data/API'

export type SettingsType = {
  mqtt: {
    server: string
    port: number
    basePath: string
  }
}

const Settings = () => {
  const [formError, setFormError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { mqtt: API._config.mqtt } })

  const { t } = useTranslation(undefined, { keyPrefix: 'Settings' })

  const onSubmit = useCallback<SubmitHandler<SettingsType>>(
    async (values) => {
      await API.saveSettings(values)
        .then(() => setFormError(''))
        .catch(() => setFormError(t('connectionError') ?? ''))
    },
    [t]
  )

  return (
    <Box justify={'center'} align={'center'} fill>
      <Card>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Box gap={'small'}>
            <Box gap={'small'} pad={{ bottom: 'small' }} border={'bottom'}>
              <Text weight={'bold'}>{t('mqtt')}</Text>
              <TextField
                {...register('mqtt.server')}
                label={t('mqttServer')}
                error={errors.mqtt?.server?.message}
              />
              <TextField
                {...register('mqtt.port', {
                  setValueAs: (value) => Number(value),
                })}
                label={t('mqttPort')}
                error={errors.mqtt?.port?.message}
              />
              <TextField
                {...register('mqtt.basePath')}
                label={t('mqttBasePath')}
                error={errors.mqtt?.basePath?.message}
              />

              {formError ? (
                <Text color={'var(--error)'}>{formError}</Text>
              ) : null}
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
