import { FC, useCallback } from 'react'
import { Box, Button, Card, Form, Text } from 'grommet'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { TextField } from './app/AppComponents'

const SignIn: FC<{ signIn: (user: string) => void }> = ({ signIn }) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'SignIn' })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { user: '' },
  })

  const onSubmit = useCallback<(values: { user: string }) => void>(
    ({ user }) => {
      signIn(user.toLowerCase())
    },
    [signIn]
  )

  return (
    <Box justify={'center'} align={'center'} fill>
      <Card pad={'medium'}>
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
