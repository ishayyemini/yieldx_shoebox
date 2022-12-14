import { useEffect, useState } from 'react'
import { Grommet } from 'grommet'
import type { ThemeType } from 'grommet'

import GlobalContext from './data/GlobalContext'
import API from './data/API'
import ChooseReport from './components/ChooseReport'

const theme: ThemeType = {
  global: {
    font: { family: 'Lato, sans-serif' },
  },
}

const App = () => {
  const [globalState, setGlobalState] = useState({ report: null })

  useEffect(() => {
    API.configure(setGlobalState)
  }, [])

  return (
    <div className="App">
      <Grommet theme={theme}>
        <GlobalContext.Provider
          value={{ ...globalState, updateContext: setGlobalState }}
        >
          <ChooseReport />
        </GlobalContext.Provider>
      </Grommet>
    </div>
  )
}

export default App
