<template>
  <v-container fluid class="pt-0 px-6 pb-16">
    <v-row no-gutters class="py-3">
      <v-col cols="6" v-if="$route.name === 'Portfolio' || $route.name === 'Rev0x'">
        <!-- <h2
          class="text-h2 font-weight-600 text-white"
        >
          <template>{{ $route.name }}</template>
        </h2> -->
      </v-col>
      <v-col cols="12" v-else>
        <h2
          class="text-h2 font-weight-600 text-white text-center"
        >
          <template v-if="$route.name === 'Dashboard'">Dashboard</template>
          <template v-else>{{ $route.name }}</template>
        </h2>
      </v-col>
      <v-col v-if="showRefresh" cols="6" md="6" class="d-flex justify-end">
        <v-btn
          :disabled="loading"
          elevation="0"
          small
          min-width="45"
          :ripple="false"
          class="me-3 py-1 px-2 font-weight-600 text-capitalize rounded-sm"
          @click="loadPortfolio()"
          :dark="darkmode"
        >
          <v-icon size=".875rem" class="mr-2" color="#5e72e4">fas fa-redo</v-icon>
          Refresh
        </v-btn>
      </v-col>
    </v-row>

    <slot></slot>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "header-top",
  props: {
    showRefresh: Boolean,
  },
  computed: {
    ...mapGetters('generalStore', ['darkmode']),
    loading: function() {
      return this.$store.state.farmStore.loading || this.$store.state.walletStore.loading || this.$store.state.poolStore.loading;
    },
  },
  methods: {
    ...mapActions('poolStore', ['getPoolsForSelectedFarms']),
    ...mapActions('walletStore', ['loadWallet']),
    loadPortfolio() {
      if (this.$store.state.walletStore.wallet && this.$store.state.farmStore.selectedFarms && this.$store.state.farmStore.selectedFarms.length) {
        this.getPoolsForSelectedFarms();
        this.loadWallet();
      }
    },
  }
};
</script>
