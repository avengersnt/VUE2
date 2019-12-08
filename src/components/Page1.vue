<template>
  <div>
    <div>
    <a href="#" class="btn-square">BUTTON</a>
     <label　id="search">
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">検索</button>
      </label>
        <button @click="post">周辺の駐車場を検索</button>


        <button @click="getDriveplanToDestination">ルート表示</button>
        <ul>
        <button class="page6"><router-link to="/page6">インフォメーション</router-link></button><!-- Page6画面へ -->
        </ul>
    </div>
    <br>

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
   background: #668ad8;/*ボタン色*/
}
label {
/* 左下位置固定 */
 position: fixed;
 bottom: 10px;
 right: 10px;
 font-size: 80px;

}
