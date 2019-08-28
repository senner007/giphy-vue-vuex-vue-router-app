import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import imagesLoaded from "vue-images-loaded";

Vue.config.productionTip = false;
Vue.directive("images-loaded", imagesLoaded);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
