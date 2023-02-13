import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'
import ChooseReport from './components/reports/ChooseReport'
import SignIn, { signInAction } from './components/auth/SignIn'
import AuthLayout from './components/AuthLayout'
import ReportView from './components/reports/ReportView'
import Reports, { reportsLoader } from './components/reports/Reports'
import MainLayout, { mainLoader } from './components/MainLayout'
import Devices, { devicesLoader } from './components/devices/Devices'
import DevicesInfo from './components/devices/DevicesInfo'
import DeviceView, { deviceViewLoader } from './components/devices/DeviceView'
import Settings, { settingsLoader } from './components/settings/Settings'

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
            element: <Devices />,
            loader: devicesLoader,
            children: [
              {
                path: 'devices',
                element: <DevicesInfo />,
                children: [
                  {
                    path: ':MAC',
                    element: <DeviceView />,
                    loader: deviceViewLoader,
                  },
                ],
              },
            ],
          },
          {
            path: 'settings',
            element: <Settings />,
            loader: settingsLoader,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: <SignIn />,
            action: signInAction,
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
