import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import "../src/plugins/vee-validate";
import VueMask from "v-mask";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(VueMask);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
