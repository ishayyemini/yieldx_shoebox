const sql = require('mssql')

const get_report_data = async ({ username, UID, offset }) => {
  if (username === 'all') username = ''
  if (!offset) offset = 0
  console.log(`Fetching data of test number ${UID}, offsetting by ${offset}`)

  const _fetchAmount = 5000

  const config = {
    user: 'sa',
    password: 'Yieldxbiz2021',
    server: '3.127.195.30',
    database: 'SensorsN',
    options: { encrypt: false },
  }
  await sql.connect(config).catch((e) => console.log(e))

  const [records, countRes] = await new sql.Request()
    .query(
      `
SELECT * 
FROM SensorsData
WHERE dateCreated = (
  SELECT dateCreated
  FROM Locations
  WHERE UID = ${UID} 
  ${username ? `and Customer = '${username}'` : ''}
)
ORDER BY UID
OFFSET ${offset} ROWS
FETCH NEXT ${_fetchAmount} ROWS ONLY

${
  !offset
    ? `
SELECT Count(*) as row_count
FROM SensorsData
WHERE dateCreated = (
  SELECT dateCreated
  FROM Locations
  WHERE UID = ${UID} 
  ${username ? `and Customer = '${username}'` : ''}
)
`
    : ''
}
      `
    )
    .then((res) => {
      console.log(res.rowsAffected)
      if (res.err) console.log(res.err)
      return res.recordsets || [[], []]
    })
    .catch((e) => console.log(e))

  // sql.close()

  console.log(`Done, fetched ${records?.length} records`)
  const nextOffset =
    records?.length === _fetchAmount ? offset + records?.length : null

  if (!nextOffset) sql.close()

  const requestsNeeded = !offset
    ? Math.ceil((countRes?.[0]?.row_count || 1) / _fetchAmount) - 1
    : null

  return { requestsNeeded, records, nextOffset }
}

module.exports.default = get_report_data
