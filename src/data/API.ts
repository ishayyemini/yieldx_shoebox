import queryString from 'query-string'

import { UpdateContextType } from './GlobalContext'

export type ReportType = {
  UID: string
  BoardID: string
  Contact: string
  'Farm type': string
  Location: string
  GPS: string
  'Union No': string
  'Farm No': string
  House: string
  InHouseLoc: string
  Length: number
  Width: number
  'Flock size': number
  Age: number
  'Broiler family': string
  Sickness: string
  Mortality: number
  Disease: string
  Comment: string
  DateToDB: string
  dateCreated: string
  Customer?: string
}

class APIClass {
  _config: { user: string } = { user: '' }
  _setGlobalState: UpdateContextType = () => null

  configure(
    { user }: { user: string },
    setGlobalState?: UpdateContextType
  ): void {
    this._config = { user }
    if (setGlobalState) this._setGlobalState = setGlobalState
  }

  async getReports(): Promise<ReportType[]> {
    const username = this._config.user === 'all' ? '' : this._config.user
    return await fetch(
      'https://wm6dajo0id.execute-api.us-east-1.amazonaws.com/dev/get-reports?' +
        queryString.stringify({ username })
    )
      .then((res) => res.json())
      .then((res) => {
        this._setGlobalState((oldCtx) => ({
          ...oldCtx,
          reportList: res.slice().reverse() ?? [],
        }))
        return res
      })
  }
}

const API: APIClass = new APIClass()

export default API
