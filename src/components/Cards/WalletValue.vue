<template>
  <v-card class="card-shadow mb-6" :dark="darkmode">
    <v-card-text class="card-stats-padding">
      <v-row no-gutters>
        <v-col cols="12" lg="9" md="9">
          <div
            class="font-weight-600 text-muted text-uppercase text-h5"
          >
            Wallet
          </div>
          <p class="font-weight-600 text-h2 mb-0">
            {{ walletValue | toCurrency(round) }}
          </p>
        </v-col>
        <v-col class="text-right">
          <v-avatar color="bg-gradient-warning">
            <v-icon size="20" class="text-white">
              fas fa-wallet
            </v-icon>
          </v-avatar>
        </v-col>
      </v-row>

      <!-- <p class="mt-4 mb-0 text-body font-weight-light">
        <span class="text-success me-2">3.48%</span> Since last month
      </p> -->
    </v-card-text>
    <v-overlay
      :absolute="true"
      :value="loading"
    >
      <div class="text-center">
        <v-progress-circular
          indeterminate
          color="white"
        ></v-progress-circular>
      </div>
    </v-overlay>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "Wallet",
  computed: {
    ...mapGetters('generalStore', ['darkmode', 'round']),
    loading: function() {
      return this.$store.state.walletStore.loading;
    },
    walletValue: function() {
      return this.$store.state.walletStore.walletValue;
    },
  }
}
</script>