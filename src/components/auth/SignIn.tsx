import { Box, Button, Card, Form, Text } from 'grommet'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  ActionFunction,
  redirect,
  useNavigation,
  useSearchParams,
  useSubmit,
} from 'react-router-dom'

import { Loader, TextField } from '../app/AppComponents'
import { useCallback } from 'react'
import API from '../../data/API'

export const signInAction: ActionFunction = async ({ request }) => {
  const { user, next } = Object.fromEntries(
    (await request.formData()).entries()
  ) as { user?: string; next?: string }
  console.log(next)
  if (user) return await API.signIn(user).then(() => redirect('/' + next))
  else return null
}

const SignIn = () => {
  const [params] = useSearchParams()

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
      const next = params.get('next') ?? ''
      submit({ user, next }, { method: 'post' })
    },
    [params, submit]
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
