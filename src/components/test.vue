<template>
<div id="GoogleMap">
    <google-map />
  </div>
</template>

<script>


var setlat;
var setlng;

export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 26.231408, lng: 127.685525 },
      markers: [],
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
    OnButtonClick() {
      var request = new XMLHttpRequest();

      request.open('GET', 'https://map.yahooapis.jp/search/local/V1/localSearch?output=json&appid=dj00aiZpPWk0clhRdTdrVVd0ZiZzPWNvbnN1bWVyc2VjcmV0Jng9ZDA-&gc=0306005', true);
      // request.responseType = 'json';

      request.onload = function () {
      var data = this.response;
      var obj = JSON.parse(data);
      var feature = obj['Feature']
      // console.log(JSON.stringify(feature));
      console.log(JSON.stringify(feature[0]));

 };

      request.send();


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

</style>
