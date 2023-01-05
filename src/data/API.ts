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

  configure(setGlobalState?: UpdateContextType) {
    if (setGlobalState) this._setGlobalState = setGlobalState
  }

  async getCurrentUser(): Promise<string> {
    const user = localStorage.getItem('user')
    if (!user) throw new Error('No authenticated user')
    this._config.user = user
    return user
  }

  async signIn(user: string): Promise<string> {
    user = user.toLowerCase()
    localStorage.setItem('user', user)
    this._config.user = user
    return user
  }

  async signOut(): Promise<void> {
    localStorage.removeItem('user')
    localStorage.removeItem('settings')
    this._config.user = ''
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
