  <template>
  <div>
      <button v-on:click="getLocationData()">Get Data</button>
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
      getLocationData() {
        this.$http.get('http://localhost:8080/api/v2/query',
          {
            params: {
              last: '7d'
            }
          }).then(response => {
            var rawDataList = JSON.parse(response.data)
            for (var i = 0; i < rawDataList.length; i++) {
                var rawData = rawDataList[i]
                console.log(rawData)
                if(Date.parse(rawData.time) > Date.parse('2017-02-04T10:14:49.532900134Z') && rawData.lat != 0 && rawData.lng != 0) {
                  this.locationData.push(rawData)
                }
            }
            var self = this;
            setTimeout(function() {
                 self.getLocationData()
             }, 10000);
          }, response => {
            // error callback
        })
      }
    },
    mounted: function () {
        this.getLocationData()
    }
  }
  </script>