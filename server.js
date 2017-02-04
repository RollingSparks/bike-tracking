var httpProxy = require('http-proxy');
var express = require('express');
var cors = require('cors')
var app = express()
app.use(cors())
var conf = require('./conf.js');

var proxy = httpProxy.createProxyServer();
app.all("/api/*", function(req,res) {
  proxy.web(req, res, {
    target: "https://rollingsparks.data.thethingsnetwork.org/",
    secure: true,
    changeOrigin: true,
    headers: {
      'Accept': 'application/json',
      'Authorization': conf.ttnAuthKey
    }
  });
});

app.use(express.static('frontend/___dist'));
var server = app.listen(8080, function() {
  console.log('Express is listening to http://localhost:8080');
});
