<template>
  <div class="page6">


    <ul>
      <botton id="page6"><router-link to="/">戻る</router-link></botton><!-- Page1画面へ -->
    </ul>
    <button @click="fun">現在地を送信</button>
    <button @click="fun2">選択した場所を送信</button>
    <br>
    <Gmap-map @click="place($event)"　:center="center"
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
var select_lat;
var select_lng;
var relaylat = [];
var relaylng = [];
var relay;
var setlat;
var setlng;
var path = [];
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

　place(event){
    if (event) {
            var lat = event.latLng.lat()
             var lng = event.latLng.lng()

             console.log(lat);
             console.log(lng);
             var marker2 = {
               lat: Number(lat),
               lng: Number(lng)
             };
             this.markers =  [
             {position: {lat: Number(lat), lng: Number(lng)}}
           ]
            select_lat = Number(lat);
            select_lng = Number(lng);
      //    this.markers.push({ position: marker2 });
          this.places.push(this.currentPlace);
           console.log(this.markers)
}
     },
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
      for ( var i=0;  i<lat.length;   i++)  {
      relaylat[i] = lat[i];
        relaylng[i] = lng[i];
      }
     console.log(lat.length);
    console.log(relaylat.length);
    relay = relaylat.length;
        for ( var i=0;  i<lat.length;   i++)  {
      var marker2 = {
        lat: Number(lng[i]),
        lng: Number(lat[i])
      };
      markers: [
        {position: {lat: lng, lng: lat}}
      ]
      //this.markers.push({ position: marker2 });
    //  this.places.push(this.currentPlace);
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
    getDriveplanToDestination(){
       var result = new Promise(function(resolve) {
         var req = new XMLHttpRequest();


  //       req.open("GET", "http://10.0.0.247:8989/route?point=26.21360535,127.68046814&point="+relaylng[0]+","+relaylat[0]+"&point="+relaylng[1]+","+relaylat[1]+"&point="+setlat+","+setlng+"&points_encoded=false&instructions=false&debug=true", false); // HTTPメソッドとアクセスするサーバーの　URL　を指定
         req.open("GET", "http://10.0.0.247:8989/route?point=26.2516868,127.76840779999998&point="+relaylng[4]+","+relaylat[4]+"&point="+relaylng[1]+","+relaylat[1]+"&point="+relaylng[2]+","+relaylat[2]+"&point="+relaylng[3]+","+relaylat[3]+"&point="+relaylng[0]+","+relaylat[0]+"&point="+setlat+","+setlng+"&points_encoded=false&instructions=false&debug=true&ch.disable=true&pass_through=true&weighting=", false); // HTTPメソッドとアクセスするサーバーの　URL　を指定
         req.send();
        // console.log();
      //  console.log(req.responseText);
        // console.log(req.readyState);
        // console.log(req.status);
         var rst = JSON.parse(req.responseText).paths[0].points.coordinates;
      //   console.log(rst);
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
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    fun(){
      navigator.geolocation.getCurrentPosition(position => {
      var lat = position.coords.latitude;
      var lon = position.coords.lonitude;
      console.log(lat);
      });
      console.log("lat");

},


    fun2(){
    console.log("rst2");
    }}}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  font-size: 30px;
}
button {
  height: 38px;
  background-color: white;
  color: blue;
  border: solid 1px blue;
  border-radius: 2px;
  padding: 0 24px;
  cursor: pointer;

  &:hover {
    background-color: blue;
    color: white;
  }
}
ul {
/* 左下位置固定 */
 position: fixed;
 bottom: 10px;
 right: 10px;
 font-size: 30px;

}
</style>
