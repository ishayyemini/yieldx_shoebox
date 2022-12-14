import { createContext } from 'react'

import type { ReportType } from './API'

type ContextType = {
  report?: ReportType
  updateContext: Function
}

const GlobalContext = createContext<ContextType>({ updateContext: () => {} })

export default GlobalContext
