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
//import hello from './vue/_helloworld.vue'
import L from 'leaflet'
import './vendor/moving_marker'

var MapContainer = {
  template: '<div><div id="map">Map Container</div><div class="map-nav"><ul><li v-for="(bike, index) in bikes" v-on:click="toggle(index)">{{ bike.name }}</li></ul></div></div>',
  data: function(){
    return {
      bikes: [
        {
          name: 'Bike 1',
          color: 'blue',
          positions: [
            [47.410850, 8.546487],
            [47.410850, 8.548487],
            [47.400850, 8.548487],
          ]
        },
      ],
    }
  },
  methods: {
    toggle: function (index) {
      var bike = this.bikes[index];
      var polyline = L.polyline(bike.positions, {color: bike.color}).addTo(map);
      var myMovingMarker = L.Marker.movingMarker(bike.positions,[2000, 5000]).addTo(map);
      myMovingMarker.start();
    }
  }
};

new Vue({
  el: '#app',
  components: {
    MapContainer
  }
})

var map = L.map('map').setView([47.400850, 8.548487], 13);

L.tileLayer(
  'https://api.mapbox.com/styles/v1/jan-meier/ciyprowvq001s2rplvaewol7y/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamFuLW1laWVyIiwiYSI6ImNpeW13bDc2aTAwMjgycXFxa2UzYW9xdGgifQ.FyvywRS7qvwzGbCHYCnrxA',
  {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\/a> contributors'
  }).addTo(map);



// Polyfills
import "babel-polyfill"
import 'svgxuse'

// Scripts
import './scripts/pagetransition'
import './scripts/preloader'
// import './scripts/bodyclass'
// import './scripts/lazyloading'
// import './scripts/photoswipe'
// import './scripts/waypoints.anime'
