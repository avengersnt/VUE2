<template>
  <div id="app">

    <div id= "app" > <gmap-map /> </div>
        <router-view/>

  </div>
</template>

<script>
import GoogleMap from "./components/GoogleMap";
import Page6 from "./components/Page6";

export default {
  name: 'App' , components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
