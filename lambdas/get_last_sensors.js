const sql = require('mssql')

const get_last_sensors = async ({ MAC }) => {
  console.log(`Fetching last sensors by ${MAC}`)

  const config = {
    user: 'sa',
    password: 'Yieldxbiz2021',
    server: '3.127.195.30',
    database: 'SensorsN',
    options: { encrypt: false },
  }
  await sql.connect(config).catch((e) => console.log(e))

  const lastSensors = await new sql.Request()
    .query(
      `
SELECT top(1) UID, DateToDB as Time, Temperature,
       [Relative Humidity] as Humidity, Pressure, SPG41_voc as VOC,
       STC31_CO2 as CO2, SPG41_nox as NOx
FROM SensorsData 
WHERE BoardID = '${MAC}'
ORDER BY DateToDB desc
`
    )
    .then((res) => res.recordset?.[0] ?? {})
    .catch((e) => console.log(e))

  sql.close()

  if (lastSensors.Time) console.log(`Done, fetched from ${lastSensors.Time}`)
  else console.log("Couldn't find records")

  return lastSensors
}

module.exports.default = get_last_sensors
