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

export type DeviceType = {
  MAC: string
  Customer: string
  Location: string
  House: string
  InHouseLoc: string
  FW: string
  Adapters: { [key: string]: string }
  Online: boolean
  Cycle?: number
  Stage?: number
  DateUpdated?: string
}

export type LastSensorsType = {
  UID?: string
  Time?: string
  Temperature?: number
  Humidity?: number
  Pressure?: number
  VOC?: number
  CO2?: number
  NOx?: number
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
    await new Promise((r) => setTimeout(r, 1000))
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
        this._setGlobalState((oldCtx) => ({ ...oldCtx, reportList: res ?? [] }))
        return res ?? []
      })
  }

  async getDevices(): Promise<DeviceType[]> {
    const username = this._config.user === 'all' ? '' : this._config.user
    return await fetch(
      'https://wm6dajo0id.execute-api.us-east-1.amazonaws.com/dev/get-devices?' +
        queryString.stringify({ username })
    )
      .then((res) => res.json())
      .then((res) => {
        this._setGlobalState((oldCtx) => ({ ...oldCtx, deviceList: res ?? [] }))
        return res ?? []
      })
  }

  async getLastSensors(MAC: string): Promise<LastSensorsType> {
    return await fetch(
      'https://wm6dajo0id.execute-api.us-east-1.amazonaws.com/dev/get-last-sensors?' +
        queryString.stringify({ MAC })
    ).then((res) => res.json() ?? {})
  }

  async getOTAList(): Promise<string[]> {
    return await fetch(
      'https://wm6dajo0id.execute-api.us-east-1.amazonaws.com/dev/get-ota-list'
    )
      .then((res) => res.json() ?? [])
      .then((res) => {
        this._setGlobalState((oldCtx) => ({ ...oldCtx, otaList: res }))
        return res
      })
  }
}

const API: APIClass = new APIClass()

export default API
