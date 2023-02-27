import { useCallback, useEffect, useState } from 'react'
import { Box, Main } from 'grommet'
import {
  LoaderFunction,
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

export const mainLoader: LoaderFunction = async ({ request }) => {
  const pathname = new URL(request.url).pathname.slice(1)
  return API.getCurrentUser().catch(() => {
    throw redirect(`/login${pathname ? `?next=${pathname}` : ''}`)
  })
}

const MainLayout = () => {
  const user = useLoaderData() as string

  const [globalState, setGlobalState] = useState<GlobalState>({ user })

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    API.configure(setGlobalState)
    API.subscribeToDevices()
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
