import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'

import App from './App'
import ChooseReport from './components/reports/ChooseReport'
import SignIn from './components/auth/SignIn'
import AuthLayout from './components/AuthLayout'
import ReportView from './components/reports/ReportView'
import Reports, { reportsLoader } from './components/reports/Reports'
import MainLayout, { mainLoader } from './components/MainLayout'
import Devices, { devicesLoader } from './components/devices/Devices'
import DevicesInfo from './components/devices/DevicesInfo'
import API from './data/API'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        loader: mainLoader,
        children: [
          {
            path: 'reports',
            element: <Reports />,
            loader: reportsLoader,
            children: [
              { index: true, element: <ChooseReport /> },
              { path: ':UID', element: <ReportView /> },
            ],
          },
          {
            path: 'devices',
            element: <Devices />,
            loader: devicesLoader,
            children: [
              { index: true, element: <DevicesInfo /> },
              {
                path: ':UID',
                element: <div />,
                children: [{ path: 'update', element: <div /> }],
              },
            ],
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <SignIn />,
            action: async (args) => {
              const user = await args.request
                .formData()
                .then((res) => res.get('user'))
              if (typeof user === 'string')
                return await API.signIn(user).then(() => redirect('/'))
              else return null
            },
          },
        ],
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as Element)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
