import { FC } from 'react'
import { t } from 'i18next'
import { Button, Card } from 'grommet'
import styled from 'styled-components'
import * as Icons from 'grommet-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { ButtonExtendedProps } from 'grommet/components/Button'

const StyledNavButton = styled(Button)<{ current: boolean }>`
  background: ${(props) =>
    props.current ? 'var(--outline-variant)' : 'inherit'};
  color: var(--on-surface-variant);

  :hover {
    background: ${(props) =>
      !props.current ? 'var(--secondary-container)' : ''};
  }

  svg {
    fill: var(--on-surface-variant);
    stroke: var(--on-surface-variant);
  }
`

interface NavButtonProps extends ButtonExtendedProps {
  to: string
}
const NavButton: FC<NavButtonProps> = (props) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <StyledNavButton
      {...props}
      onClick={() => navigate(props.to)}
      current={props.to === pathname}
      // secondary
    />
  )
}

const TopMenu: FC<{ signOut: () => void }> = ({ signOut }) => {
  return (
    <Card
      direction={'row'}
      align={'center'}
      justify={'evenly'}
      gap={'medium'}
      basis={'60px'}
    >
      <NavButton
        icon={<Icons.List />}
        label={t('ChooseReport.title')}
        to={'/'}
      />
      <NavButton
        icon={<Icons.SettingsOption />}
        label={t('ManageDevices.title')}
        to={'/manage-devices'}
      />
      <Button label={t('signOut')} onClick={signOut} secondary />
    </Card>
  )
}

export default TopMenu
