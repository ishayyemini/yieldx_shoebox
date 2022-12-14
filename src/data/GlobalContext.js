import { createContext } from 'react'

import type { ReportType } from './API'

export type ContextType = {
  report?: ReportType,
}

const GlobalContext: React.Context<ContextType> = createContext({})

export default GlobalContext
