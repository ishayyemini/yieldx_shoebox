import { useCallback, useEffect, useState } from 'react'
import { Box, Main } from 'grommet'
import {
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import GlobalContext, { ContextType } from '../data/GlobalContext'
import API from '../data/API'
import TopMenu from './TopMenu'

type GlobalState = Omit<ContextType, 'updateContext'>

export const mainLoader = async () => {
  // Check if user is signed in, auth-wise
  return API.getCurrentUser().catch(() => {
    throw redirect('/login')
  })
}

const MainLayout = () => {
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
        <TopMenu signOut={signOut} />
        <Box basis={'300px'} flex={'grow'} overflow={'auto'}>
          <Outlet context={globalState} />
        </Box>
      </Main>
    </GlobalContext.Provider>
  )
}

export default MainLayout
