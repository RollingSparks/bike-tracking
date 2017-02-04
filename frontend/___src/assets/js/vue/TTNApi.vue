  <template>
  <div>
      <button v-on:click="getLocationData('2017-02-04T10:00:00.00Z', '2017-02-05T10:00:00.00Z')">Get Data</button>
      <div class="status" v-if="locationData">
        <li v-for="location in locationData">
            {{ location.time }}: {{ location.lat }} | {{ location.lng }}
          </li>
      </div>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        locationData: [],
        message: '123'
      }
    },
    methods: {
      getLocationData(from, to) {
        var self = this;
        this.$http.get('http://localhost:8080/api/v2/query',
          {
            params: {
              last: '1d'
            }
          }).then(response => {
            var rawDataList = JSON.parse(response.data)
            for (var i = 0; i < rawDataList.length; i++) {
                var rawData = rawDataList[i]
                if(Date.parse(rawData.time) > Date.parse(from) && Date.parse(rawData.time) < Date.parse(to) && rawData.lat !== 0 && rawData.lng !== 0) {
                  var inArray = false
                  for (var j = 0; j < this.locationData.length; j++) {
                    if (this.locationData[j].time === rawData.time) {
                      inArray = true
                    }
                  }

                  if(!inArray) {
                    this.locationData.push(rawData)
                  }
                }
              }
              setTimeout(function() {
                   self.getLocationData(from, to)
               }, 10000);
          }, response => {
            // error callback
        })
      }
    },
    mounted: function () {
        this.getLocationData('2017-02-04T10:00:00.00Z', '2017-02-05T10:00:00.00Z')
    }
  }
  </script>