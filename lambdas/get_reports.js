const sql = require('mssql')

const get_reports = async () => {
  console.log(`Fetching reports`)

  const config = {
    user: 'sa',
    password: 'Yieldxbiz2021',
    server: '3.127.195.30',
    database: 'SensorsN',
    options: { encrypt: false },
  }
  await sql.connect(config).catch((e) => console.log(e))

  const reports = await new sql.Request()
    .query(`SELECT * FROM Locations`)
    .then((res) => res.recordset)
    .catch((e) => console.log(e))

  sql.close()

  console.log(`Done, fetched ${reports.length} reports`)

  return reports
}

module.exports.default = get_reports
