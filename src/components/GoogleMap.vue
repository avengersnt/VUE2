<template>
  <div>
　  <div>
    <label　id="search">
       <gmap-autocomplete class="example"
         @place_changed="setPlace">
        </gmap-autocomplete>
       <button class="example2"
       　@click="addMarker">検索</button>
     </label>
       <button class="example3"
       @click="post">周辺の駐車場を検索</button>


       <button class="example4"
       @click="getDriveplanToDestination">ルート表示</button>
       <ul>
       <botton id="page6"><router-link to="/page6">フィードバック</router-link></botton><!-- Page6画面へ -->
       </ul>
   </div>
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
var msg = "test";

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
      message: msg,
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
      this.markers.push({ position: marker2 });
      this.places.push(this.currentPlace);
}

    },

    async postMysql() {
      let response = await Methods.testPush(setlat, setlng);
      console.log(setlat);
      var data = response.data;
      console.log(data);
},



    async getMysql() {
          console.log("11")
          let response = await Methods.testGet();
          console.log(response);
          var data = response.data;
          msg = String(data);
          console.log(data.lat);
          console.log(data.lenth);
          for ( var i=0;  i<1;   i++)  {
             var marker2 = {
             lat: Number(data.lat),
             lng: Number(data.lng)
             };
           this.markers.push({ position: marker2 });
           //this.places.push(this.currentPlace);
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
},
};
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
  font-size: 48px;
}
ul {
/* 左下位置固定 */
 position: fixed;
 bottom: -10px;
 right: 10px;
}
label {
  width: 300px;
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: #668ad8;/*ボタン色*/
  color: #FFF;
  border-bottom: solid 4px #627295;
  border-radius: 3px;
}
label:active {
  /*ボタンを押したとき*/
  -webkit-transform: translateY(4px);
  transform: translateY(4px);/*下に動く*/
  border-bottom: none;/*線を消す*/
}
.example {
    width: 240px;

}
.example2 {
position: relative;
display: inline-block;
padding: 0.25em 0.5em;
text-decoration: none;
color: #FFF;
background: #fd9535;/*背景色*/
border-bottom: solid 2px #d27d00;/*少し濃い目の色に*/
border-radius: 4px;/*角の丸み*/
box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
font-weight: bold;
}
.example3 {
position: relative;
 display: inline-block;
 padding: 0.25em 0.5em;
 text-decoration: none;
 color: #FFF;
 background: #03A9F4;/*色*/
 border: solid 1px #0f9ada;/*線色*/
 border-radius: 4px;
 box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
 text-shadow: 0 1px 0 rgba(0,0,0,0.2);
}
.example4 {
position: relative;
 display: inline-block;
 padding: 0.25em 0.5em;
 text-decoration: none;
 color: #FFF;
 background: #03A9F4;/*色*/
 border: solid 1px #0f9ada;/*線色*/
 border-radius: 4px;
 box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
 text-shadow: 0 1px 0 rgba(0,0,0,0.2);
}
#search {

}
</style>
