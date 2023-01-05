import { useCallback, useEffect, useState } from 'react'
import { Box, Main } from 'grommet'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom'

import './data/i18n'
import GlobalContext, { ContextType } from './data/GlobalContext'
import API from './data/API'
import TopMenu from './components/TopMenu'

type GlobalState = Omit<ContextType, 'updateContext'>

export const appLoader = () => {
  const user = localStorage.getItem('user')
  if (!user) throw redirect('/login')
  return { user }
}

const App = () => {
  const { user: initUser } = useLoaderData() as { user: string }

  const [globalState, setGlobalState] = useState<GlobalState>({
    user: initUser,
  })

  const navigate = useNavigate()

  useEffect(() => {
    API.configure({ user: globalState.user }, setGlobalState)
  }, [globalState.user])

  const signOut = useCallback<() => void>(() => {
    localStorage.removeItem('user')
    localStorage.removeItem('settings')
    setGlobalState({ user: '' })
    navigate('/login')
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
