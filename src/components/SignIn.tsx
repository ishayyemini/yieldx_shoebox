import { Box, Button, Card, Form, Text } from 'grommet'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

import { TextField } from './app/AppComponents'

const SignIn = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'SignIn' })

  const { register, handleSubmit } = useForm({
    defaultValues: { username: '' },
  })

  const onSubmit = useCallback((values: { username: string }) => {
    console.log(values.username)
  }, [])

  return (
    <Box justify={'center'} align={'center'} fill>
      <Card pad={'medium'} gap={'medium'}>
        <Text weight={'bold'} size={'large'} textAlign={'center'}>
          {t('title')}
        </Text>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField {...register('username')} label={t('username')} />
        </Form>

        <Button label={t('buttonLogin')} alignSelf={'center'} primary />
      </Card>
    </Box>
  )
}

export default SignIn
