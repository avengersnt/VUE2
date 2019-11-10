// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as VueGoogleMaps from "vue2-google-maps";
import axios from 'axios'

// Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(VueGoogleMaps, {
  installComponents: true,
  load: {
    key: "AIzaSyDoX0k_TXCtdymsTdksBg-HY_CRrUIqLNk",
    libraries: "places", // necessary for places input
    autobindAllEvents: false
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
