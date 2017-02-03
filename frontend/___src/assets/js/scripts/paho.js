// Create a client instance
var client = new Paho.MQTT.Client('eu.thethings.network', Number(1883), '/mqtt', 'rollingsparks')

console.log(client)

// set callback handlers
client.onConnectionLost = onConnectionLost
client.onMessageArrived = onMessageArrived

// connect the client
client.connect({userName: 'rollingsparks', password: 'ttn-account-v2.OER_mr4qDRg8lxRiZjP2swhfuxr4EmoK95dt1BzoHfM', timeout: 30, mqttVersion: 4, mqttVersionExplicit: true, keepAliveInterval: 10, cleanSession: true, useSSL: false, onSuccess:onConnect})


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log('onConnect')
  client.subscribe('rollingsparks/devices/sparkone/up')
  message = new Paho.MQTT.Message('Hello')
  message.destinationName = 'rollingsparks/devices/sparkone/down'
  client.send(message)
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log('onConnectionLost:'+responseObject.errorMessage)
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log('onMessageArrived:'+message.payloadString)
}