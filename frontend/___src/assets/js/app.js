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

var vm = new Vue({
  el: '#api',
  components: {
    status
  }
});


console.log(vm)
vm.message = 'new message' // change data
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  console.log('were are here')
  vm.$el.textContent === 'new message' // true
})

// Polyfills
import 'babel-polyfill'
import 'svgxuse'

// Scripts
import './scripts/example'
import './scripts/pagetransition'
import './scripts/preloader'
// import './scripts/bodyclass'
// import './scripts/lazyloading'
// import './scripts/photoswipe'
// import './scripts/waypoints.anime'
