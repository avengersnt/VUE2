<template>
  <div>
    <div>
     <label　id="search">
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
        <button @click="post">周辺の駐車場を検索</button>

        <button @click="remove">消す</button>

    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="15"
      style="width:100%;  height: 500px;"
      >
      <gmap-polyline v-bind:path.sync="paths" v-bind:options="{ strokeColor:'#008000'}">
         </gmap-polyline>
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>

import Methods from '@/api/methods'
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

var setlat;
var setlng;
var path = []
var path2 = [
     {lat: 26.231408,  lng: 127.685525 },
     {lat: 55.9358131, lng: -4.7770143 },
     {lat: 55.9361256, lng: -4.7767353 },
     {lat: 55.9366784, lng: -4.7739458 }
]
export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 26.231408, lng: 127.685525 },
      markers: [],
      paths: path,
      places: [],

      currentPlace: null
    };
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    async post() {
      let response = await Methods.testPosting(setlat, setlng)
      var data = response.data;
      var lat = data.lat;
      var lng = data.lng;
      console.log(lat[0]);
      console.log(lat.length);
        for ( var i=0;  i<lat.length;   i++)  {
      var marker2 = {
        lat: Number(lng[i]),
        lng: Number(lat[i])
      };
      this.markers.push({ position: marker2 });
      this.places.push(this.currentPlace);
}

    },

    remove(){
  　　path.splice(this.paths.length - 1, 1);
    console.log("いいい");
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        setlat = marker['lat']
        setlng = marker['lng']
      　console.log(setlat);
        console.log(setlng);
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
  font-size: 48px;
}
#search {
position: relative;
 top: 0;
 left: 0;
  width: 500px;
}
