<template>
  <div>
    <div>
      <label　id="search">
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
        <button @click="getDriveplanToDestination">serch</button>
      </label>


    </div>

    <gmap-map
      :center="center"
      :zoom="15"
      style="width:100%;  height: 500px;"
    >
    <gmap-polyline v-bind:path.sync="path" v-bind:options="{ strokeColor:'#008000'}"></gmap-polyline>

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
var path = [];

export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense

      center: { lat: 26.231408, lng: 127.685525 },
      markers: [],
      places: [],
      currentPlace: null,
      path: path,
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
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
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
    },

    getDriveplanToDestination(){
       var result = new Promise(function(resolve) {
         var req = new XMLHttpRequest();
         req.open("GET", "http://10.0.0.247:8989/route?point=26.21360535,127.68046814&point=26.24261661,127.75863647&points_encoded=false&instructions=false&debug=true&ch.disable=true&edge_traversal=true", false); // HTTPメソッドとアクセスするサーバーの　URL　を指定
         req.send();
         var rst = JSON.parse(req.responseText).paths[0].points.coordinates;
         console.log(rst);
         resolve(rst);
       });


      result.then(function(road2){
        for(var i=0; i<road2.length; i++){ //ここで入れる
          var Lat = parseFloat(road2[i][1]);
          var Lng = parseFloat(road2[i][0]);
          path.push({lat:Lat,lng:Lng});
        }
      });

    },
  }

};
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
  font-size: 48px;
}
#search {
  width: 100px;
}
