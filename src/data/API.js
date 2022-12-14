export type ReportType = {
  UID: string,
  BoardID: string,
  Contact: string,
  'Farm type': string,
  Location: string,
  GPS: string,
  'Union No': string,
  'Farm No': string,
  House: string,
  InHouseLoc: string,
  Length: number,
  Width: number,
  'Flock size': number,
  Age: number,
  'Broiler family': string,
  Sickness: string,
  Mortality: number,
  Disease: string,
  Comment: string,
  DateToDB: string,
  dateCreated: string,
  Customer?: string,
}

class APIClass {
  _setGlobalState: function

  configure(setGlobalState: function): void {
    this._setGlobalState = setGlobalState
  }

  async getReports(): Promise<[{ Customer: string }]> {
    return await fetch(
      'https://wm6dajo0id.execute-api.us-east-1.amazonaws.com/dev/get-reports'
    ).then((res) => res.json())
  }
}

const API = new APIClass()

export default API
