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

alert('yoooo');

// Vue Stuff
import Vue from 'vue'
import hello from './vue/_helloworld.vue'

new Vue({
  el: '#app',
  components: {
    hello
  }
})

// Polyfills
import "babel-polyfill"
import 'svgxuse'

// Scripts
import './scripts/example'
import './scripts/pagetransition'
import './scripts/preloader'
// import './scripts/bodyclass'
// import './scripts/lazyloading'
// import './scripts/photoswipe'
// import './scripts/waypoints.anime'
