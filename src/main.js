import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import DashboardPlugin from "./plugins/dashboard-plugin";
import i18n from "./i18n";
import store from './store';
import './filters/shortenContractFilter';
import './filters/to2DecimalsFilter';
import './filters/toCurrencyFilter';

Vue.config.productionTip = false;

// TODO: REMOVE EVENT HUB
const plugin = {
  install(Vue) {
    Vue.prototype.$eventHub = new Vue();
  }
};

Vue.use(plugin);

// plugin setup
Vue.use(DashboardPlugin);

new Vue({
  store,
  router,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
