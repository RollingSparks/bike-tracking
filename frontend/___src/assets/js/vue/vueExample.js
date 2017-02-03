import Vue from 'vue'
import hello from './vue/_helloworld.vue'
import L from 'leaflet'

new Vue({
    el: '#app',
    components: {
        hello
    }
})

var map = L.map('map').setView(position_1, 13);
