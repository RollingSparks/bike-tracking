var ttn = require('ttn');
var express = require('express');
var expressVue = require('express-vue')
var app = express();
app.use(express.static('frontend/__dist'));

app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', __dirname + '/views');
app.set('vue', {
  componentsDir: __dirname + '/views/components',
  defaultLayout: 'layout'
});

var region = 'eu';
var appId = 'rollingsparks';
var accessKey = 'ttn-account-v2.OER_mr4qDRg8lxRiZjP2swhfuxr4EmoK95dt1BzoHfM';

var client = new ttn.Client(region, appId, accessKey, {port: 1883, clientId: 'rollingsparks', protocol: 'mqtt', keepalive: 30});

var client = new ttn.Client(region, appId, accessKey);

var messages = [];
messages.push({ location: {lat: '44.000', long: '6.000'}});
var devices = [];
devices.push({ name: 'sparkone'});


/*client.on('connect', function(connack) {
  console.log('[DEBUG]', 'Connect:', connack);
});

client.on('error', function(err) {
  console.error('[ERROR]', err.message);
});

client.on('activation', function(deviceId, data) {
  console.log('[INFO] ', 'Activation:', deviceId, JSON.stringify(data, null, 2));
});

client.on('device', null, 'down/scheduled', function(deviceId, data) {
  console.log('[INFO] ', 'Scheduled:', deviceId, JSON.stringify(data, null, 2));
});

client.on('message', function(deviceId, data) {
  var jsonData = JSON.stringify(data, null, 2);
  console.info('[INFO] ', 'Message:', deviceId, jsonData);
  messages.push(jsonData.payload_fields);
});

client.on('message', null, 'led', function(deviceId, led) {

  // Toggle the LED
  var payload = {
    led: !led
  };

  // If you don't have an encoder payload function:
  // var payload = [led ? 0 : 1];

  console.log('[DEBUG]', 'Sending:', JSON.stringify(payload));
  client.send(deviceId, payload);
});*/

app.get('/', function(req, res){
  res.render('index', {
    data: {
      title: 'Messages from TTN',
      messages: messages
    },
    vue: {
      components: ['messages']
    }
  });
});

app.get('/device/:deviceId', function(req, res){
  var device = devices.filter(function(item) {
    return item.name === req.params.deviceId;
  })[0];
  res.render('device', {
    data: {
      title: 'Device ID',
      device: device
    }

  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});