var client  = mqtt.connect('mqtt://eu.thethings.network', {username: 'rollingsparks', password: 'ttn-account-v2.OER_mr4qDRg8lxRiZjP2swhfuxr4EmoK95dt1BzoHfM', port: 1883, clientId: 'rollingsparks', wsOptions: {}})

client.on('connect', function () {
  client.subscribe('rollingsparks/devices/sparkone/up')
  client.publish('rollingsparks/devices/sparkone/down', 'Hello mqtt')
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})