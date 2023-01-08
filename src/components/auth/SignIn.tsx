import { Box, Button, Card, Form, Text } from 'grommet'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigation, useSubmit } from 'react-router-dom'

import { Loader, TextField } from '../app/AppComponents'
import { useCallback } from 'react'

const SignIn = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'SignIn' })

  const navigation = useNavigation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { user: '' } })

  const submit = useSubmit()

  const onSubmit = useCallback<(values: { user: string }) => void>(
    ({ user }) => {
      submit({ user }, { method: 'post' })
    },
    [submit]
  )

  return (
    <Box justify={'center'} align={'center'} fill>
      {navigation.state !== 'idle' && <Loader full />}

      <Card>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Box gap={'medium'}>
            <Text weight={'bold'} size={'large'} textAlign={'center'}>
              {t('title')}
            </Text>
            <TextField
              {...register('user', {
                required: t('user.error.required') ?? '',
              })}
              label={t('user.label')}
              error={errors.user?.message}
            />
            <Button
              label={t('buttonLogin')}
              alignSelf={'center'}
              type={'submit'}
              primary
            />
          </Box>
        </Form>
      </Card>
    </Box>
  )
}

export default SignIn
