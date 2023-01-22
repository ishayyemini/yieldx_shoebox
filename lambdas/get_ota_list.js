const got = require('got')

const get_ota_list = async () => {
  console.log('Fetching list of ShoeBox OTAs')

  const response = await got('http://3.127.195.30/ShoeBox/OTA/')
  const versions = response.body.match(/(?<=<A .+>)fw[0-9.k]+\.bin(?=<\/A>)/g)

  console.log(`Done, found ${versions.length} OTA files`)
  return versions
}

module.exports.default = get_ota_list
