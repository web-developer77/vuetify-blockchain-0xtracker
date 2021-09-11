<template>
  <v-form
    class="py-1 px-5 border-bottom-dark"
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-row>
      <v-col md="11" sm="11">
        <v-row>
          <v-col md="12" sm="12">
            <label for="" class="font-weight-600 mb-2 d-block text-white">Wallet Address</label>
            <v-text-field
              v-model="wallet"
              :disabled="loading"
              rounded
              outlined
              solo
              class="font-size-input placeholder-dark input-alternative input-icon"
              :rules="walletRules"
              :dark="darkmode"
            >
              <template slot="prepend-inner">
                <v-icon size=".875rem">fas fa-wallet</v-icon>
              </template>
              <template v-slot:append v-if="!wallet || !connectedWallet || (wallet !== connectedWallet)">
                <v-icon @click="setWalletDialog(true)">
                  fas fa-plug
                </v-icon>
              </template>
              <template v-slot:append v-else-if="connectedWallet">
                <v-icon @click="setWalletDialog(true)" color="green">
                  fas fa-plug
                </v-icon>
              </template>
            </v-text-field>
          </v-col>
          <!-- <v-col md="6" sm="12">
            <label for="" class="font-weight-600 mb-2 d-block text-white">Farms</label>
            <v-autocomplete
              rounded
              v-model="selectedFarms"
              :disabled="loading"
              :rules="farmRules"
              :items="farms"
              outlined
              chips
              small-chips
              multiple
              deletable-chips
              solo
              class="font-size-input text-color-dark input-alternative input-focused-alternative input-icon mb-0"
              :dark="darkmode"
              :search-input.sync="farmSearchInput"
              @change="farmSearchInput=''"
              :menu-props="darkmode ? 'dark' : 'light'"
            >
              <template v-slot:item="data">
                <template>
                  <v-list-item-avatar v-if="data.item.group">
                    <v-icon>fas fa-star</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.text" />
                    <v-list-item-subtitle v-html="`${data.item.group ? 'Featured' : ''}`" />
                  </v-list-item-content>
                </template>
              </template>
              <template slot="prepend-inner">
                  <v-icon size=".875rem"
                  >fas fa-tractor</v-icon
                >
              </template>
            </v-autocomplete>
          </v-col> -->
        </v-row>
      </v-col>
      <v-col md="1" sm="1" class="text-center">
        <label for="" class="font-weight-600 mb-1 d-block text-white">Go!</label>
        <v-btn
          :disabled="loading"
          elevation="0"
          :ripple="false"
          height="40"
          min-width="40"
          width="40"
          class="font-weight-600 text-capitalize btn-ls btn-default me-2 my-2 rounded-circle"
          @click="loadPortfolio()"
          :dark="darkmode"
        >
          <v-icon size="18" color="#5e72e4">fa-arrow-circle-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      farmSearchInput: '',
      valid: true,
    };
  },
  mounted () {
    if (this.$route.name === "Portfolio" && this.$route?.params?.wallet && this.$route?.params?.wallet != this.wallet) {
      this.wallet = this.$route?.params?.wallet;
      this.$router.push({ name: 'Portfolio', params: { wallet: this.wallet }}).catch(()=>{});
    }
  },
  created () {
    this.getFarms();
  },
  computed: {
    ...mapGetters('generalStore', ['darkmode']),
    ...mapGetters('farmStore', ['farmRules']),
    ...mapGetters('walletStore', ['connectedWallet', 'walletRules']),
    loading: function() {
      return this.$store.state.farmStore.loading || this.$store.state.walletStore.loading || this.$store.state.poolStore.loading;
    },
    wallet: {
      get () {
        return this.$store.state.walletStore.wallet;
      },
      set (value) {
        this.setWallet(value);
      }
    },
    selectedFarms: {
      get () {
        return this.$store.state.farmStore.selectedFarms;
      },
      set (value) {
        this.setSelectedFarms(value);
      }
    },
    sortFarmsAlpha: function() {
      // make a new array as .sort modifies original array
      const array = JSON.parse(JSON.stringify(this.$store.state.farmStore.farms));
      return array.sort((a, b) => a.name.localeCompare(b.name));
    },
    allFeaturedFarms: function() {
      return this.sortFarmsAlpha.filter(farm => farm.featured === 1)
    },
    allRegularFarms: function() {
      return this.sortFarmsAlpha.filter(farm => farm.featured !== 1)
    },
    joinedFarms: function() {
      return this.allFeaturedFarms.concat(this.allRegularFarms);
    },
    farms: function() {
      return this.joinedFarms.map(farm => {return { text: `${farm.name} (${this.$t(farm.network)})`, value: farm, network: farm.network, group: farm.featured === 1 ? 'Featured' : '' }});
    },
  },
  methods: {
    ...mapActions('farmStore', ['getFarms', 'setSelectedFarms']),
    ...mapActions('generalStore', ['setWalletDialog']),
    ...mapActions('poolStore', ['getPoolsForSelectedFarms']),
    ...mapActions('walletStore', ['loadWallet', 'setWallet']),
    loadPortfolio() {
      if (this.$refs.form.validate()) {
        // .catch(()=>{}); to prevent error when navigating to the same component with the same params
        // pushing additional params to trigger loading of farms and wallets when navigating from this page
        this.$router.push({ name: 'Portfolio', params: { wallet: this.wallet, loadFarms: true, loadWallet: true }}).catch(()=>{});
        this.loadWallet();
        this.getPoolsForSelectedFarms();
      } else this.valid = false;
    },
  }
};
</script>

<style scoped>
.bg-gradient-default {
  background: linear-gradient(87deg,#172b4d,#1a174d) !important
}

.bg-gradient-primary {
  background: linear-gradient(87deg,#5e72e4,#825ee4) !important;
}
</style>
