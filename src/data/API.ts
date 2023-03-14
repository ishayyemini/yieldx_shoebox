import queryString from 'query-string'
import mqtt from 'mqtt/dist/mqtt'

import { UpdateContextType } from './GlobalContext'
import { SettingsType } from '../components/settings/Settings'

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
  DateUpdated?: Date
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
  mqtt: {
    server: string
    port: number
    basePath: string
  }
}

export type ReportDataType = {
  UID: string
  BoardID: string
  'Sensor Index': number
  'Sensor ID': number
  'Time Since PowerOn': number
  dateCreated: string
}

class APIClass {
  _config: APIConfigType = {
    username: '',
    mqtt: { server: 'broker.mqttdashboard.com', port: 8000, basePath: '/mqtt' },
  }
  _setGlobalState: UpdateContextType = () => null
  _client: mqtt.MqttClient | null = null

  configure(setGlobalState?: UpdateContextType) {
    if (setGlobalState) this._setGlobalState = setGlobalState
  }

  async setupMqtt(
    server: string,
    port: number,
    basePath: string
  ): Promise<mqtt.MqttClient> {
    return new Promise((resolve, reject) => {
      const client = mqtt.connect(`ws://${server}:${port}/${basePath}`)
      const timeout = setTimeout(() => {
        console.error('Failed to connect')
        client.end()
        reject('Connection timed out')
      }, 5000)
      client.on('connect', () => {
        clearTimeout(timeout)
        resolve(client)
      })
      client.on('error', (err) => {
        console.error('Connection error: ', err)
        client.end()
        reject(err)
      })
      window.onbeforeunload = () => {
        client.end()
      }
    })
  }

  async loadUser(username: string): Promise<string> {
    let { server, port, basePath } = JSON.parse(
      localStorage.getItem('mqtt') || '{}'
    )
    if (!server) server = 'broker.mqttdashboard.com'
    if (!port) port = 8000
    if (!basePath && basePath !== '') basePath = 'mqtt'
    this._config.mqtt = { server, port, basePath }
    this._config.username = username
    this._client = await this.setupMqtt(server, port, basePath)
    return username
  }

  async getCurrentUser(): Promise<string> {
    const username = localStorage.getItem('user')
    if (!username) throw new Error('No authenticated user')
    return this.loadUser(username)
  }

  async signIn(username: string): Promise<string> {
    await new Promise((r) => setTimeout(r, 1000))
    username = username.toLowerCase()
    localStorage.setItem('user', username)
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

  subscribeToDevices(): void {
    if (this._client) {
      this._setGlobalState((oldCtx) => ({ ...oldCtx, devices: {} }))
      this._client.subscribe('Stat/#')
      this._client.on('message', (topic, payload) => {
        if (topic.startsWith('Stat/') && topic.split('/').length === 5) {
          const MAC = topic.split('/').pop() || ''
          const p: DeviceType = {
            MAC,
            Customer: '',
            Location: '',
            House: '',
            InHouseLoc: '',
            FW: '',
            Adapters: {},
            Online: false,
          }
          const ps = payload.toString()
          const [Location, House, InHouseLoc] = topic.split('/').slice(1, 4)
          p.Location = Location
          p.House = House
          p.InHouseLoc = InHouseLoc
          const Cycle = Number(ps.match(/(?<=Cycle:)\d+/)?.[0])
          if (!isNaN(Cycle)) p.Cycle = Cycle
          const Stage = Number(ps.match(/(?<=Stage:)\d+/)?.[0])
          if (!isNaN(Stage)) p.Stage = Stage
          p.FW = ps.match(/(?<=FW:)[0-9.]{8}/)?.[0] ?? ''
          p.Adapters = Object.fromEntries(
            ps
              .match(/(?<=Adapters:).+(?= ,)/)?.[0]
              .split(' ')
              .map((item: string) => item.split(/:(.*)/)) ?? []
          )
          p.Online = ps.includes('*** Online ***')
          const time = ps.match(/(?<=GMT:).+?(?=: )/)?.[0]
          if (time) p.DateUpdated = new Date(time + '+00:00')
          console.log(p)
          if (p.Location)
            this._setGlobalState((oldCtx) => ({
              ...oldCtx,
              devices: { ...(oldCtx.devices || {}), [MAC]: p },
            }))
        }
      })
    }
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

  async saveSettings({ mqtt }: SettingsType): Promise<void> {
    this._client?.end()
    this._client = await this.setupMqtt(mqtt.server, mqtt.port, mqtt.basePath)
    this._config.mqtt = mqtt
    localStorage.setItem('mqtt', JSON.stringify(mqtt))
    this.subscribeToDevices()
  }

  async pushUpdate(devices: string[], version: string): Promise<void> {
    await Promise.all(
      devices.map(
        (device) =>
          new Promise<void>((resolve) => {
            this._client?.publish(
              `OTA/${device}`,
              `http://3.127.195.30/ShoeBox/OTA/${version}`,
              { retain: true },
              () => resolve()
            )
          })
      )
    )
    // TODO get indication that software updated
    // TODO fix update not syncing after device is online
  }

  async getReportData(UID: string): Promise<ReportDataType[]> {
    return await fetch(
      'http://3.127.195.30:5000/get-report-data?' +
        queryString.stringify({ UID, ...this._config })
    ).then(async (res) => {
      let rowCount: number | undefined = undefined
      let rawData = ''
      let rowsFetched = 0

      const printing = setInterval(() => {
        console.log(`Got ${rowsFetched} of ${rowCount} rows`)
      }, 1000)

      const rows: unknown = await new Promise((resolve, reject) => {
        if (res.body)
          res.body.pipeTo(
            new WritableStream({
              write(chunk) {
                const chunkString = new TextDecoder().decode(chunk)
                if (!isNaN(Number(chunkString)) && rowCount === undefined) {
                  console.log(Number(chunkString))
                  rowCount = Number(chunkString)
                } else {
                  rawData += chunkString
                  rowsFetched += chunkString.match(/"UID":/g)?.length ?? 0
                }
              },
              close() {
                const rows = JSON.parse(rawData) as ReportDataType[]
                console.log(
                  `Fetching complete, got ${rows.length} of ${rowCount}`
                )
                resolve(rows)
              },
              abort(err) {
                reject(err)
              },
            })
          )
        else reject('Nothing returned from server')
      }).catch((err) => console.error(err))
      clearInterval(printing)

      if (Array.isArray(rows)) return rows
      else return []
    })
  }
}

const API: APIClass = new APIClass()

export default API
