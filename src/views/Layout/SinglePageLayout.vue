<template>
  <v-app>
    <v-main class="auth-pages bg-default">
      <div class="header-auth pt-1 bg-gradient-primary position-relative">
        <v-container>
          <v-row class="d-flex">
            <SponsorsHeader />
            <v-col cols="12" class="d-flex align-center">
              <v-spacer />
              <v-img
                v-if="darkmode"
                max-height="50px"
                max-width="253px"
                src="@/assets/0xtracker-black.svg"
                class="me-5"
              />
              <v-img
                v-else
                max-height="50px"
                max-width="253px"
                src="@/assets/0xtracker-white.svg"
                class="me-5"
              />
              <v-spacer />
            </v-col>
            <v-col cols="12" md="5" class="mx-auto py-0">
              <h1 class="text-h1 font-weight-600 text-center mb-2" :class="{'text-black': darkmode, 'text-white': !darkmode}">
                {{ headerTitle() }}
              </h1>
            </v-col>
          </v-row>
        </v-container>
        <div class="separator separator-bottom separator-skew zindex-100">
          <svg
            x="0"
            y="0"
            viewBox="0 0 2560 100"
            preserveAspectRatio="none"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              class="fill-default"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>
      <FadeTransition :duration="200" origin="center top" mode="out-in">
        <v-container class="mt-n16 pb-0">
          <router-view></router-view>
          <ContentFooter auth v-if="!$route.meta.hideFooter" />
        </v-container>
      </FadeTransition>
    </v-main>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex';
import SponsorsHeader from "@/components/SponsorsHeader.vue";
import { FadeTransition } from "vue2-transitions";
import ContentFooter from "@/components/Footer.vue";

export default {
  name: "auth-layout",
  components: {
    SponsorsHeader,
    FadeTransition,
    ContentFooter,
  },
  data() {
    return {
      paragraphs: "",
    };
  },
  computed: {
    ...mapGetters('generalStore', ['darkmode']),
  },
  methods: {
    headerTitle() {
      switch (this.$route.name) {
        case "Home":
          return "Enter your Wallet Address, click Go!";
        default:
          break;
      }
    },
  },
};
</script>
