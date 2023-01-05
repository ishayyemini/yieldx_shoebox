import { useCallback, useEffect, useState } from 'react'
import { Box, Main } from 'grommet'
import {
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import './data/i18n'
import GlobalContext, { ContextType } from './data/GlobalContext'
import API from './data/API'
import TopMenu from './components/TopMenu'

type GlobalState = Omit<ContextType, 'updateContext'>

export const appLoader = () => {
  // Check if user is signed in, auth-wise
  return API.getCurrentUser().catch(() => {
    throw redirect('/login')
  })
}

const App = () => {
  const user = useLoaderData() as string

  const [globalState, setGlobalState] = useState<GlobalState>({ user })

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    API.configure(setGlobalState)
  }, [])

  useEffect(() => {
    if (pathname === '/') navigate('reports')
  }, [navigate, pathname])

  const signOut = useCallback<() => void>(() => {
    API.signOut().then(() => navigate('/login'))
  }, [navigate])

  return (
    <GlobalContext.Provider
      value={{ ...globalState, updateContext: setGlobalState }}
    >
      <Main>
        {globalState.user ? (
          <>
            <TopMenu signOut={signOut} />
            <Box basis={'300px'} flex={'grow'} overflow={'auto'}>
              <Outlet />
            </Box>
          </>
        ) : (
          <Outlet />
        )}

        {/*{authStage === 'loading' ? (*/}
        {/*  <Box align={'center'} justify={'center'} fill>*/}
        {/*    <Oval />*/}
        {/*  </Box>*/}
        {/*) : null}*/}
        {/*{authStage === 'signIn' ? <SignIn signIn={signIn} /> : null}*/}
        {/*{authStage === 'loggedIn' ? (*/}
        {/*  <>*/}
        {/*    <TopMenu signOut={signOut} />*/}
        {/*    <Box basis={'300px'} flex={'grow'} overflow={'auto'}>*/}
        {/*      <Outlet />*/}
        {/*    </Box>*/}
        {/*  </>*/}
        {/*) : null}*/}
      </Main>
    </GlobalContext.Provider>
  )
}

export default App
