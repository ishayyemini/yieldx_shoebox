const mqtt = require('mqtt')

const get_devices = async ({ username }) => {
  console.log(
    `Fetching devices belonging to ${username ? `"${username}"` : 'everyone'}`
  )

  const config = { clean: true, secure: false }
  const client = await mqtt.connect(
    'mqtt://broker.mqttdashboard.com:1883',
    config
  )

  const topic = 'cfg/#'
  client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], () => {
      console.log(`Subscribed to topic '${topic}'`)
    })
  })

  const messages = await new Promise((resolve) => {
    let receivedMessage = false
    const tmpMessages = []
    client.on('message', (topic, payload) => {
      if (!receivedMessage) {
        receivedMessage = true
        setTimeout(() => {
          client.end()
          resolve(tmpMessages)
        }, 100)
      }
      tmpMessages.push(payload.toString())
      console.log('Received Message:', topic, payload.toString())
    })
  })

  console.log(messages)

  return messages
}

module.exports.default = get_devices
