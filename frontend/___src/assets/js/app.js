/**
 * Bundle Scripts
 */

// Debugging
const _debug = true
window._debug = _debug

if (_debug === true) {
  console.log('Debugging is: true')
  const html = document.getElementsByTagName('html')[0]
  html.classList.add('dev', 'debug')
}

// Vue Stuff
import Vue from 'vue'
import VueResource from 'vue-resource'
import status from './vue/TTNApi.vue'
Vue.use(VueResource)

var request = require('request');
request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
})

//Vue.http.headers.common['Accept'] = 'application/json'
//Vue.http.headers.common['Access-Control-Allow-Origin'] = 'true'
//Vue.http.headers.common['Authorization'] = 'key ttn-account-v2.OER_mr4qDRg8lxRiZjP2swhfuxr4EmoK95dt1BzoHfM';

new Vue({
  el: '#api',
  components: {
    status
  }
});

// Polyfills
import 'babel-polyfill'
import 'svgxuse'

// Scripts
import './scripts/example'
import './scripts/pagetransition'
import './scripts/preloader'
import './scripts/mqtt'
//import './scripts/ttn'
//import './scripts/paho'
// import './scripts/bodyclass'
// import './scripts/lazyloading'
// import './scripts/photoswipe'
// import './scripts/waypoints.anime'
