const sql = require('mssql')

const get_report_data = async ({ username, UID, offset }) => {
  if (username === 'all') username = ''
  if (!offset) offset = 0
  console.log(`Fetching data of test number ${UID}, offsetting by ${offset}`)

  const config = {
    user: 'sa',
    password: 'Yieldxbiz2021',
    server: '3.127.195.30',
    database: 'SensorsN',
    options: { encrypt: false },
  }
  await sql.connect(config).catch((e) => console.log(e))

  const request = await new sql.Request()
  request.stream = true
  request.query(
    `
SELECT * 
FROM SensorsData
WHERE dateCreated = (
  SELECT dateCreated
  FROM Locations
  WHERE UID = ${UID} 
  ${username ? `and Customer = '${username}'` : ''}
)
      `
  )

  request.pause()

  // request.on('recordset', (columns) => {
  //   // Emitted once for each recordset in a query
  // })
  //
  // request.on('row', (row) => {
  //   // Emitted for each row in a recordset
  // })
  //
  // request.on('error', (err) => {
  //   // May be emitted multiple times
  // })

  // request.on('done', (result) => {
  //   // Always emitted as the last one
  //   console.log(result)
  //   sql.close()
  //   console.timeEnd('test')
  // })

  return request
}

module.exports.default = get_report_data
