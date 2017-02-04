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
import generateDummyBikeData from './scripts/bike_data_generator'
import moment from 'moment'

var createMarker = function(){
  return L.icon({
    iconUrl: './assets/images/svg/single/bicycle_black.svg',
    iconSize: [38, 95],
    iconAnchor: [19, 46],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
  });
}

var bikes = generateDummyBikeData(4);
var from = moment().subtract(3, "days").format("X");
var to = moment().subtract(0, "days").format("X");
var lines = [];
var markers = [];

window.updateFrom = function(newFrom){
  if (from != newFrom){
    from = newFrom;
    redraw();
  }
}

window.updateTo = function(newTo){
  if (to != newTo){
    to = newTo;
    redraw();
  }
}

var cleanLines = function(){
  for (var line of lines){
    line.remove();
  }
  lines = [];
}

var cleanMarkers = function(){
  for (var marker of markers){
    marker.remove();
  }
  markers = [];
}

var clean = function() {
  cleanLines();
  cleanMarkers();
}

var toggleBike = function (index) {
  var bike = this.bikes[index];
  bike.visible = !bike.visible;
  redraw();
  return;
};

var redraw = function() {
  clean();
  for(var i = 0; i < bikes.length; i++){
    var positions = [];
    var timeDeltas = [];
    var lastTime = null;
    var bike = bikes[i];
    if (bike.visible){
      for(var record of bike.records){
        if(record.timeStamp >= from && record.timeStamp <= to){
          positions.push(record.position);
          if (lastTime){
            timeDeltas.push((lastTime - record.timeStamp)*0.05);
          }
          lastTime = record.timeStamp;
        }
      };
      if (positions.length >= 2){
        var polyline = L.polyline(positions, {
          color: bike.color,
        }).addTo(map);
        lines.push(polyline);

        //var marker = L.Marker.movingMarker(positions, timeDeltas, {
        //icon: createMarker()
        //}).addTo(map);
        //marker.start();
        //markers.push(marker);
      }
    }
  }};

var MapContainer = {
  template: '<div><div id="map">Map Container</div><div class="map-nav"><ul><li  v-for="(bike, index) in bikes" class="map-nav__item" v-bind:class="{visible: disabledClass}"  v-on:click="toggle(index)" v-bind:style="bike"></li></ul></div></div>',
  data: function(){
    var map;
    return {
      to: to,
      from: from,
      bikes: bikes,
      map: map
    }
  },
  methods: {
    toggle: toggleBike
  },
  watch: {
    bikes: function (val) {
      console.log("bike trigger");
    }
  }
};

var vueTest = new Vue({
  el: '#app',
  components: {
    MapContainer
  }
});

console.log(vueTest.components);
var map = L.map('map').setView([47.400850, 8.548487], 13);

L.tileLayer(
  'https://api.mapbox.com/styles/v1/jan-meier/ciyprowvq001s2rplvaewol7y/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamFuLW1laWVyIiwiYSI6ImNpeW13bDc2aTAwMjgycXFxa2UzYW9xdGgifQ.FyvywRS7qvwzGbCHYCnrxA',
  {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\/a> contributors'
  }).addTo(map);


import './scripts/slider.js'

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
