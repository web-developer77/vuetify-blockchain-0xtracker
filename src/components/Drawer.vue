<template>
  <v-navigation-drawer
    width="250"
    fixed
    app
    floating
    :expand-on-hover="mini"
    :value="drawer"
    :dark="darkmode"
  >
    <v-list-item class="pa-0">
      <v-list-item-content class="pa-0">
        <v-list-item-title class="title d-flex align-center mb-0">
          <div class="v-navigation-drawer-brand pa-5 d-flex align-center">
            <img v-if="darkmode" src="@/assets/0xtracker-white.svg" class="w-70" />
            <img v-else src="@/assets/0xtracker-black.svg" class="w-70" />
          </div>

          <div
            v-if="!$vuetify.breakpoint.mobile"
            class="drawer-toggler pa-5 cursor-pointer"
            :class="{ active: togglerActive }"
            @click="minifyDrawer"
          >
            <div class="drawer-toggler-inner">
              <i class="drawer-toggler-line bg-primary"></i>
              <i class="drawer-toggler-line bg-primary"></i>
              <i class="drawer-toggler-line bg-primary"></i>
            </div>
          </div>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    
    <div class="border-bottom ma-0"/>

    <v-list nav dense>
      <v-list-item-group>
        <v-list-item
          v-for="(item, i) in itemsSimple"
          :key="i"
          link
          :to="item.link"
          class="pb-1 no-default-hover"
          :ripple="false"
          active-class="item-active"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" :class="{'text-white': darkmode}" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <div class="border-bottom ma-0"/>

    <v-list nav dense>
      <v-list-item-group>
        <v-list-item
          @click="setWalletDialog(true)"
          class="pb-1 no-default-hover"
          :ripple="false"
          active-class=""
        >
          <v-list-item-icon>
            <v-icon v-if="connectedWallet" v-text="'fas fa-plug v-icon-drawer'" color="green" />
            <v-icon v-else v-text="'fas fa-plug v-icon-drawer'" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-if="connectedWallet" :class="{'text-white': darkmode}">Connected: {{ connectedWalletShort }}</v-list-item-title>
            <v-list-item-title v-else :class="{'text-white': darkmode}">Connect Wallet</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <WalletConnectDialog />
  </v-navigation-drawer>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import WalletConnectDialog from '@/components/Wallet/WalletConnectDialog'

export default {
  components: {
    WalletConnectDialog,
  },
  props: {
    drawer: {
      type: Boolean,
      default: null,
    },
  },
  data: () => ({
    mini: false,
    togglerActive: false,
    itemsSimple: [
      {
        icon: "fa-home v-icon-drawer",
        link: "/home",
        title: "Home",
      },
      {
        icon: "fa-piggy-bank v-icon-drawer",
        link: "/portfolio",
        title: "Portfolio",
      },
      {
        icon: "fa-tractor v-icon-drawer",
        link: "/farms",
        title: "Supported Farms",
      },
      {
        icon: "fa-ambulance v-icon-drawer",
        link: "/rev0x",
        title: "Rev0x",
      },
      {
        icon: "fa-cog v-icon-drawer",
        link: "/settings",
        title: "Settings",
      },
    ],
  }),
  computed: {
    currentRoute() {
      return this.$route.name;
    },
    ...mapGetters('generalStore', ['darkmode']),
    ...mapGetters('walletStore', ['connectedWallet', 'connectedWalletShort']),
  },
  watch: {
    "$vuetify.breakpoint.mobile"(val) {
      if (val) this.mini = !val;
    },
  },
  methods: {
    ...mapActions('generalStore', ['setWalletDialog']),
    ...mapActions('walletStore', ['connectWallet']),
    minifyDrawer() {
      this.togglerActive = !this.togglerActive;
      this.mini = !this.mini;
      const body = document.getElementsByTagName("body")[0];

      if (body.classList.contains("drawer-mini")) {
        body.classList.remove("drawer-mini");
      } else {
        body.classList.add("drawer-mini");
      }
    },
  },
};
</script>
