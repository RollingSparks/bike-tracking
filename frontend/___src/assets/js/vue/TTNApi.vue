  <template>
  <div>
      <button v-on:click="getLocationData()">Get Data</button>
      <div class="status" v-if="locationData">
        <p>{{ locationData }}</p>
      </div>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        locationData: ''
      }
    },
    methods: {
      getLocationData() {
        this.$http.get('https://rollingsparks.data.thethingsnetwork.org/api/v2/query', {headers: {'Authorization': 'key ttn-account-v2.OER_mr4qDRg8lxRiZjP2swhfuxr4EmoK95dt1BzoHfM'}}).then(
          function(response){
            console.log(response)
          },
          function(error){
            console.log(error)
          }
        )
      }
    }
  }
  </script>