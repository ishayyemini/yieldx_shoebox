const sql = require('mssql')

const get_report_data = async ({ username, UID }) => {
  if (username === 'all') username = ''
  console.log(`Fetching data of test number ${UID}`)

  const config = {
    user: 'sa',
    password: 'Yieldxbiz2021',
    server: '3.127.195.30',
    database: 'SensorsN',
    options: { encrypt: false },
  }
  await sql.connect(config).catch((e) => console.log(e))

  const records = await new sql.Request()
    .query(
      `SELECT * 
       FROM SensorsData
       WHERE dateCreated = (
         SELECT dateCreated
         FROM Locations
         WHERE UID = ${UID} 
         ${username ? `and Customer = '${username}'` : ''}
       )`
    )
    .then((res) => res.recordset)
    .catch((e) => console.log(e))

  sql.close()

  console.log(`Done, fetched ${records.length} records`)

  return records
}

module.exports.default = get_report_data
