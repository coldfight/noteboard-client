import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/bootstrap4-neon-glow.min.css";
import "./assets/css/open-iconic-bootstrap.min.css";
import "./assets/css/site.css";
import Vue from "vue";
import Axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Axios.defaults.baseURL = process.env.VUE_APP_API_URL;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
