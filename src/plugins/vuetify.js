/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "@fortawesome/fontawesome-free/css/all.css";

const vuetify = new Vuetify({
  theme: { disable: true },
  icons: {
    iconfont: "fa",
  },
});

Vue.use(Vuetify);

export default new Vuetify({});
