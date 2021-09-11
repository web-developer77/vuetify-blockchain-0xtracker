<template>
  <div>
    <NoDataCard v-if="loading || Object.keys(farmsWithData).length === 0" :loading="loading" />
    <v-card class="card-shadow">
      <v-card-text v-if="Object.keys(farmsWithData).length" class="px-0 py-0">
        <v-expansion-panels accordion hover multiple :value="panelsArray">
          <v-expansion-panel
            v-for="(farm, key) in farmsWithData" :key="key"
          >
            <v-expansion-panel-header>
              {{ farm.name }} ({{ farm.network }}) - {{ farm.total | toCurrency(round) }} ({{ farm.pendingTotal | toCurrency(round) }})
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <Farm :farm="farm" />
              <v-card-actions>
                <v-spacer></v-spacer>
                  <v-icon @click="getPoolsForSingleFarm({ key: farm.contract, selectedFarm: farm })">
                    fas fa-redo
                  </v-icon>
              </v-card-actions>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Farm from './Farm.vue';
import NoDataCard from '@/components/Cards/NoDataCard.vue';

export default {
  name: "Farms",
  components: {
    Farm,
    NoDataCard,
  },
  props: {
    heading: String,
  },
  data() {
    return {
      page: 1,
      headers: [
        {
          text: 'Ticker',
          align: 'start',
          sortable: true,
          value: 'symbol',
        },
        { text: 'Balance', value: 'tokenBalance' },
        { text: 'Price', value: 'tokenPrice' },
        { text: 'Value', value: 'tokenValue' },
      ],
    };
  },
  computed: {
    ...mapGetters('generalStore', ['darkmode', 'round']),
    loading: function() {
      return this.$store.state.poolStore.loading;
    },
    farmsWithData: function() {
      // getting object keys and sorting them highest to lowest into an array based on value of total,
      // then adding the contract to the object so that it can be mapped back and removed from the
      // farmsWith/Without objects when a single refresh is done 😬
      return Object.keys(this.$store.state.farmStore.farmsWithData).sort((a,b) => (this.$store.state.farmStore.farmsWithData[a].total < this.$store.state.farmStore.farmsWithData[b].total) ? 1 : -1).map(contract => {let farm = this.$store.state.farmStore.farmsWithData[contract];farm.contract = contract;return farm});
    },
    total: function() {
      let total = 0;
      for (const contract in this.farmsWithData) {
        const farm = this.farmsWithData[contract];
        total += farm.total;
      }
      return total;
    },
    panelsArray: function() {
      return Array.from({length: Object.keys(this.farmsWithData).length}, (e, i)=> i);
    },
    pendingRewards: function() {
      let pendingTotal = 0;
      for (const contract in this.farmsWithData) {
        const farm = this.farmsWithData[contract];
        pendingTotal += farm.pendingTotal;
      }
      return pendingTotal;
    },
  },
  async created() {
    if (this.$route?.params?.loadFarms) this.getPoolsForSelectedFarms();
  },
  watch: {
    total: function (val) {
      this.setFarmsValue(val);
    },
    pendingRewards: function (val) {
      this.setPendingRewardsValue(val);
    },
  },
  methods: {
    ...mapActions('farmStore', ['setFarmsValue']),
    ...mapActions('poolStore', ['getPoolsForSelectedFarms', 'getPoolsForSingleFarm', 'setPendingRewardsValue']),
  },
};
</script>
