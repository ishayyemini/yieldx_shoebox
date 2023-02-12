import { createContext } from 'react'

import type { DeviceType, ReportType } from './API'

export type UpdateContextType = (
  newCtx:
    | Omit<ContextType, 'updateContext'>
    | ((
        oldCtx: Omit<ContextType, 'updateContext'>
      ) => Omit<ContextType, 'updateContext'>)
) => void

export type ContextType = {
  user: string
  report?: ReportType
  reportList?: ReportType[]
  deviceList?: DeviceType[]
  otaList?: string[]
  updateContext: UpdateContextType
}

const GlobalContext = createContext<ContextType>({
  user: '',
  updateContext: () => null,
})

export default GlobalContext
