import { FC } from 'react'
import { t } from 'i18next'
import { Button, Card } from 'grommet'

const TopMenu: FC<{ signOut: () => void }> = ({ signOut }) => {
  return (
    <Card direction={'row'} align={'center'} gap={'medium'} basis={'60px'}>
      <Button label={t('signOut')} onClick={signOut} secondary />
    </Card>
  )
}

export default TopMenu
