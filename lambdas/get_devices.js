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

  client.on('connect', () => {
    console.log('Connected')
    client.subscribe(['cfg/#', 'Stat/#'])
  })

  const messages = await new Promise((resolve) => {
    let receivedMessage = false
    const tmpMessages = {}
    const noMessage = setTimeout(() => {
      client.end()
      resolve({})
    }, 3000)

    client.on('message', (topic, payload) => {
      if (!receivedMessage) {
        receivedMessage = true
        clearTimeout(noMessage)
        setTimeout(() => {
          client.end()
          resolve(Object.values(tmpMessages))
        }, 100)
      }
      console.log('Received Message:', topic, payload.toString())

      const UID = topic.split('/').pop()
      const p = {
        UID,
        Customer: '',
        Location: '',
        House: '',
        InHouseLoc: '',
        FW: '',
        Adapters: {},
        Online: false,
        Cycle: null,
        Stage: null,
        DateUpdated: null,
        ...(tmpMessages[UID] || {}),
      }
      const ps = payload.toString()
      if (topic.startsWith('cfg/')) {
        p.Customer = ps.match(/(?<=Cust:).+(?= Loc:)/)?.[0] ?? ''
        p.Location = ps.match(/(?<=Loc:).+(?= NewConf)/)?.[0] ?? ''
      } else if (topic.startsWith('Stat/') && topic.split('/').length === 5) {
        const [Location, House, InHouseLoc] = topic.split('/').slice(1, 4)
        p.Location = Location
        p.House = House
        p.InHouseLoc = InHouseLoc
        const Cycle = Number(ps.match(/(?<=Cycle:)\d+/)?.[0])
        if (!isNaN(Cycle)) p.Cycle = Cycle
        const Stage = Number(ps.match(/(?<=Stage:)\d+/)?.[0])
        if (!isNaN(Stage)) p.Stage = Stage
        p.FW = ps.match(/(?<=FW:)[0-9.]{8}/)[0]
        p.Adapters = Object.fromEntries(
          ps
            .match(/(?<=Adapters:).+(?= ,)/)?.[0]
            .split(' ')
            .map((item) => item.split(/:(.*)/)) ?? []
        )
        p.Online = ps.includes('*** Online ***')
        const time = ps.match(/(?<=GMT:).+?(?=: )/)?.[0]
        if (time) p.DateUpdated = new Date(time + '+00:00')
      }
      if (p.Location) tmpMessages[UID] = p
    })
  }).then((res) =>
    res.filter((item) => !username || item.Customer.toLowerCase() === username)
  )

  console.log(`Done, fetched ${messages.length} devices`)

  return messages
}

module.exports.default = get_devices
