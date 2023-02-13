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

type APIConfigType = {
  username: string
  mqttAddress?: string
}

export type SettingsType = {
  mqttServer: string
  mqttPort: number
}

class APIClass {
  _config: APIConfigType = { username: '' }
  _setGlobalState: UpdateContextType = () => null

  configure(setGlobalState?: UpdateContextType) {
    if (setGlobalState) this._setGlobalState = setGlobalState
  }

  async getCurrentUser(): Promise<string> {
    const username = localStorage.getItem('user')
    if (!username) throw new Error('No authenticated user')
    this._config.mqttAddress = localStorage.getItem('mqttAddress') ?? undefined
    this._config.username = username
    return username
  }

  async signIn(username: string): Promise<string> {
    await new Promise((r) => setTimeout(r, 1000))
    username = username.toLowerCase()
    localStorage.setItem('user', username)
    this._config.mqttAddress = localStorage.getItem('mqttAddress') ?? undefined
    this._config.username = username
    return username
  }

  async signOut(): Promise<void> {
    localStorage.clear()
    this._config.username = ''
  }

  async getReports(): Promise<ReportType[]> {
    return await fetch(
      'https://wm6dajo0id.execute-api.us-east-1.amazonaws.com/dev/get-reports?' +
        queryString.stringify({ ...this._config })
    )
      .then((res) => res.json())
      .then((res) => {
        this._setGlobalState((oldCtx) => ({ ...oldCtx, reportList: res ?? [] }))
        return res ?? []
      })
  }

  async getDevices(): Promise<DeviceType[]> {
    return await fetch(
      'https://wm6dajo0id.execute-api.us-east-1.amazonaws.com/dev/get-devices?' +
        queryString.stringify({ ...this._config })
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

  async saveSettings({ mqttServer, mqttPort }: SettingsType): Promise<void> {
    await new Promise((r) => setTimeout(r, 1000))
    this._config.mqttAddress = `mqtt://${mqttServer}:${mqttPort}`
    localStorage.setItem('mqttAddress', this._config.mqttAddress)
  }

  async pushUpdate(devices: string[], version: string): Promise<void> {
    await fetch(
      'https://wm6dajo0id.execute-api.us-east-1.amazonaws.com/dev/push-update?' +
        queryString.stringify({
          devices: devices.toString(),
          version,
          ...this._config,
        })
    )
  }
}

const API: APIClass = new APIClass()

export default API
