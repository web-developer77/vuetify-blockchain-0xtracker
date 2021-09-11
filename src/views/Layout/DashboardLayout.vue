<template>
  <v-app>
    <drawer :drawer="drawer"></drawer>
    <v-main :class="{'darkmodebg': darkmode, 'bg-gradient-primary': !darkmode}">
      <div
        @click="drawer = false"
        v-if="drawer"
        class="position-absolute drawer-state"
      ></div>
      <app-bar
        v-if="$route.name != 'Portfolio'"
        background="bg-primary"
        has-bg
        @drawer-toggle="drawer = !drawer"
        :toggle-active="drawer"
      ></app-bar>
      <app-bar
        v-else-if="$route.name == 'Portfolio'"
        background="bg-default"
        has-bg
        @drawer-toggle="drawer = !drawer"
        :toggle-active="drawer"
      ></app-bar>
      <app-bar
        v-else
        background="transparent"
        linkColor="rgba(0,0,0,.6)"
        @drawer-toggle="drawer = !drawer"
        :toggle-active="drawer"
      ></app-bar>
      <fade-transition :duration="200" origin="center top" mode="out-in">
        <router-view></router-view>
      </fade-transition>
      <SponsorsFooter />
      <Footer v-if="!$route.meta.hideFooter" />
      <v-snackbar
        :value="alerts.length"
        :timeout="-1"
      >
        <template v-for="(alert, index) in alerts"><p :key="index">{{alert}}</p></template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>
<script>
// /* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import { mapGetters } from 'vuex';
import { FadeTransition } from "vue2-transitions";
import Drawer from "@/components/Drawer.vue";
import AppBar from "@/components/AppBar.vue";
import SponsorsFooter from "@/components/SponsorsFooter.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    SponsorsFooter,
    Footer,
    FadeTransition,
    Drawer,
    AppBar,
  },
  data() {
    return {
      drawer: null,
    };
  },
  computed: {
    ...mapGetters('generalStore', ['alerts', 'darkmode']),
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("sidenav");
      }
    },
  },
  mounted() {
    this.initScrollbar();
  },
};
</script>
<style lang="scss">
.darkmodebg {
  background-color: #272727 !important;
}
</style>
