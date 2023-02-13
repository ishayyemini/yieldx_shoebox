const mqtt = require('mqtt')

const push_update = async ({ mqttAddress, version, devices }) => {
  devices = devices.split(',')
  if (devices.length < 1) throw new Error('No devices provided')
  console.log(`Updating ${devices} with ${version}`)

  const config = { clean: true, secure: false }
  const client = await mqtt.connect(
    mqttAddress || 'mqtt://broker.mqttdashboard.com:1883',
    config
  )

  await Promise.all(
    devices.map(
      (MAC) =>
        new Promise((resolve) => {
          client.on('connect', () => {
            client.publish(
              `OTA/${MAC}`,
              `http://3.127.195.30/ShoeBox/OTA/${version}`,
              { retain: true },
              () => resolve()
            )
          })
        })
    )
  )

  client.end()

  console.log(`Done, updated ${devices.length} devices`)
}

module.exports.default = push_update
