const got = require('got')
const { decompress } = require('compress-json')

console.time('test')

// grd({ UID: 267 }).then((request) => {
//   request.resume()
//   const rows = []
//   request.on('row', (row) => {
//     rows.push(row)
//     if (rows >= 10) {
//       request.pause()
//       request.cancel()
//     }
//   })
//   console.timeEnd('test')
// })

const UID = 268

const request = got.stream(
  `http://3.127.195.30:5000/get-report-data?UID=${UID}&noCompression=1`
)

let rowCount = undefined
let chunks = []
let rows = []

request.on('data', (chunk) => {
  if (!isNaN(chunk) && rowCount === undefined) {
    console.log(Number(chunk.toString()))
    rowCount = Number(chunk.toString())
  } else {
    chunks.push(chunk)
    // console.log(chunk.toString())
    // rows = rows.concat(JSON.parse(JSON.stringify(chunk)))
    // console.log(`Got ${rows.length} of ${rowCount} rows`)
  }
})

request.on('end', () => {
  let size = chunks.reduce((prev, cur) => {
    return prev + cur.length
  }, 0)

  let rows = JSON.parse(Buffer.concat(chunks, size).toString())
  console.log(rows.length)
  console.log('Fetching complete')
})

request.on('error', function (e) {
  console.log('Error: ' + e.message)
})
