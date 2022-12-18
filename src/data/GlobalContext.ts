import { createContext } from 'react'

import type { ReportType } from './API'

export type UpdateContextType = (
  newCtx: ContextType | ((oldCtx: ContextType) => ContextType)
) => void
export type ContextType = {
  report?: ReportType
  updateContext: UpdateContextType
}

const GlobalContext = createContext<ContextType>({ updateContext: () => null })

export default GlobalContext
