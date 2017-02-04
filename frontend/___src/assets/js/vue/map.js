import generateDummyBikeData from '../scripts/bike_data_generator'

var MapContainer = {
    template: '<div><div id="map">Map Container</div><div class="map-nav"><ul><li class="map-nav__item" v-for="(bike, index) in bikes" v-on:click="toggle(index)" style="background-color: blue"></li></ul></div></div>',
  data: function(){
    return {
      bikes: generateDummyBikeData(4),
    }
  },
  methods: {
    toggle: function (index) {
      var bike = this.bikes[index];
      var polyline = L.polyline(bike.positions, {
        color: bike.color,
      }).addTo(map);
      var myMovingMarker = L.Marker.movingMarker(bike.positions,[2000, 5000], {
        icon: createMarker()
      }).addTo(map);
      myMovingMarker.start();
    }
  }
};

export default MapContainer;
