import { useCallback, useEffect, useState } from 'react'
import { Box, Grommet, Main, type ThemeType } from 'grommet'
import { css } from 'styled-components'
import { Oval } from 'react-loader-spinner'

import './data/i18n'
import GlobalContext, { ContextType } from './data/GlobalContext'
import API from './data/API'
import GlobalStyle from './components/app/GlobalStyle'
import SignIn from './components/SignIn'
import ChooseReport from './components/ChooseReport'
import TopMenu from './components/TopMenu'

type GlobalState = Omit<ContextType, 'updateContext'>

const theme: ThemeType = {
  global: {
    font: { family: 'Lato, sans-serif' },
    colors: {
      brand: 'var(--main)',
      'accent-1': 'var(--accent1)',
      'accent-2': 'var(--accent2)',
      muted: 'var(--muted)',
    },
  },
  card: {
    container: {
      background: 'var(--surface-variant)',
      margin: 'small',
      pad: 'medium',
      round: 'small',
      elevation: 'none',
      extend: css`
        color: var(--on-surface-variant);
      `,
    },
  },
  button: {
    primary: {
      background: 'var(--primary)',
      font: { weight: 400 },
      extend: css`
        color: var(--on-primary);
        transition: opacity 0.2s;
      `,
    },
    default: {
      background: 'var(--secondary-container)',
      font: { weight: 400 },
      extend: css`
        color: var(--on-secondary-container);
        transition: opacity 0.2s;
      `,
    },
    secondary: {
      border: { color: 'var(--primary)', width: '1px' },
      font: { weight: 400 },
      extend: css`
        color: var(--primary);
        transition: opacity 0.2s;
      `,
    },
    hover: {
      extend: css`
        opacity: 0.8;
        transition: opacity 0.1s;
      `,
    },
  },
}

const App = () => {
  const [authStage, setAuthStage] = useState<
    'checkingAuth' | 'loading' | 'loggedIn' | 'signIn'
  >('checkingAuth')
  const [globalState, setGlobalState] = useState<GlobalState>({ user: '' })

  // Load user from API on login/start
  const loadUser = useCallback<() => void>(async () => {
    setAuthStage('loading')
    await API.getReports()
    setAuthStage('loggedIn')
  }, [])

  // On start
  useEffect(() => {
    const user: string = localStorage.getItem('user') ?? ''
    setGlobalState((old) => ({ ...old, user }))
    API.configure({ user }, setGlobalState)

    // Check if logged in
    if (user) loadUser()
    else setAuthStage('signIn')
  }, [loadUser])

  // After auth sign in
  const signIn = useCallback<(user: string) => void>(
    (user: string) => {
      localStorage.setItem('user', user)
      API.configure({ user })
      loadUser()
    },
    [loadUser]
  )

  const signOut = useCallback<() => void>(() => {
    localStorage.removeItem('user')
    localStorage.removeItem('settings')
    setGlobalState({ user: '' })
    setAuthStage('signIn')
  }, [])

  return (
    <Grommet theme={theme}>
      <GlobalStyle />
      <GlobalContext.Provider
        value={{ ...globalState, updateContext: setGlobalState }}
      >
        <Main>
          {authStage === 'loading' ? (
            <Box align={'center'} justify={'center'} fill>
              <Oval />
            </Box>
          ) : null}
          {authStage === 'signIn' ? <SignIn signIn={signIn} /> : null}
          {authStage === 'loggedIn' ? (
            <>
              <TopMenu signOut={signOut} />
              <Box basis={'300px'} flex={'grow'} overflow={'auto'}>
                <ChooseReport />
              </Box>
            </>
          ) : null}
        </Main>
      </GlobalContext.Provider>
    </Grommet>
  )
}

export default App
