var httpProxy = require('http-proxy');
var express = require('express');
var app = express();
var conf = require('./conf.js');

/**
 * curl -X GET --header 'Accept: application/json'
 * --header 'Authorization: key ttn-account-v2.HzLYlXzyjFkNEl5y7oljbfOGzoYPZoRFHCRApkRgkZg'
 * 'https://rollingsparks.data.thethingsnetwork.org/api/v2/query'
 */
var proxy = httpProxy.createProxyServer();
app.all("/api/*", function(req,res) {
  proxy.web(req, res, {
    target: "https://rollingsparks.data.thethingsnetwork.org/",
    secure: true,
    changeOrigin: true,
    headers: {
      'Authorization': conf.ttnAuthKey,
    }
  });
});

app.use(express.static('frontend/___dist'));
var server = app.listen(3000, function() {
  console.log('Express is listening to http://localhost:3000');
});
