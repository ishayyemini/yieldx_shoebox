import { useEffect, useState } from 'react'
import { Grommet, Main, type ThemeType } from 'grommet'

import './data/i18n'
import GlobalContext, { ContextType } from './data/GlobalContext'
import API from './data/API'
// import ChooseReport from './components/ChooseReport'
import GlobalStyle from './components/app/GlobalStyle'
import { css } from 'styled-components'
import SignIn from './components/SignIn'

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
    body: { pad: 'small' },
    container: {
      background: 'var(--surface-variant)',
      margin: 'small',
      pad: 'small',
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
  const [globalState, setGlobalState] = useState({
    report: undefined,
  } as ContextType)

  useEffect(() => {
    API.configure(setGlobalState)
  }, [])

  return (
    <Grommet theme={theme}>
      <GlobalStyle />
      <GlobalContext.Provider
        value={{ ...globalState, updateContext: setGlobalState }}
      >
        <Main>
          <SignIn />
          {/*<ChooseReport />*/}
        </Main>
      </GlobalContext.Provider>
    </Grommet>
  )
}

export default App
