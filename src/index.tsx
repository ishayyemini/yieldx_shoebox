import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Grommet, ThemeType } from 'grommet'
import { css } from 'styled-components'

import App, { appLoader } from './App'
import ChooseReport, { chooseReportLoader } from './components/ChooseReport'
import GlobalStyle from './components/app/GlobalStyle'
import SignIn from './components/SignIn'
import AuthLayout from './components/AuthLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: appLoader,
    children: [
      {
        path: '',
        element: <ChooseReport />,
        loader: chooseReportLoader,
      },
      {
        path: 'manage-devices',
        element: <div />,
        // loader: teamLoader,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <SignIn />,
        // loader: () => console.log('ghr'),
      },
    ],
  },
])

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
  layer: {
    background: 'var(--background)',
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

const root = ReactDOM.createRoot(document.getElementById('root') as Element)
root.render(
  <React.StrictMode>
    <Grommet theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </Grommet>
  </React.StrictMode>
)
