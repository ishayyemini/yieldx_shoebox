import { useEffect, useState } from 'react'
import { Grommet, type ThemeType } from 'grommet'
import { createGlobalStyle } from 'styled-components'

import './data/i18n'
import GlobalContext from './data/GlobalContext'
import API from './data/API'
import ChooseReport from './components/ChooseReport'

// noinspection CssInvalidPropertyValue
const GlobalStyle = createGlobalStyle`
  html {
    height: -webkit-fill-available;
  }
  
  body {
    font-family: "Lato", sans-serif;
    --main: #f9dec8ff;
    --accent1: #90e39aff;
    --accent2: #b26270ff;
    --active: #ddf093ff;
    --muted: #638475ff;
    --body: #E0E0E0;

    display: flex;
    margin: 0;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
  
  #root {
    display: flex;
    flex-grow: 1;
    
    > div {
      display: flex;
      flex-grow: 1;
    }
  }
`

const theme: ThemeType = {
  global: {
    font: { family: 'Lato, sans-serif' },
  },
}

const App: React.FC = () => {
  const [globalState, setGlobalState] = useState({ report: null })

  useEffect(() => {
    API.configure(setGlobalState)
  }, [])

  return (
    <Grommet theme={theme}>
      <GlobalStyle />
      <GlobalContext.Provider
        value={{ ...globalState, updateContext: setGlobalState }}
      >
        <ChooseReport />
      </GlobalContext.Provider>
    </Grommet>
  )
}

export default App
