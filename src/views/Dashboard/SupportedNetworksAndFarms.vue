<template>
  <div>
    <HeaderTopDashboard />
    <v-container class="px-6 mt-n16">
      <v-row>
        <v-col class="mx-auto pt-0" lg="8">
          <v-text-field
            v-model="search"
            :disabled="loading"
            rounded
            outlined
            solo
            class="font-size-input input-alternative input-icon"
            :dark="darkmode"
            :placeholder="`Search ${farms.length} farms...`"
          />
        </v-col>
      </v-row>
      <v-row v-if="!loading && farmsByNetwork && Object.keys(farmsByNetwork).length">
        <v-col v-for="(networkWithFarms, network) in farmsByNetwork" :key="network" class="mx-auto pt-0" lg="8">
          <SupportedNetworkAndFarms :network="network" :farms="networkWithFarms" />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col class="mx-auto pt-0" lg="8">
          <v-overlay
            :absolute="true"
            :value="loading"
          >
            <div class="text-center">
              <v-progress-circular
                indeterminate
                color="white"
              />
            </div>
          </v-overlay>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import HeaderTopDashboard from "@/components/HeaderTopDashboard.vue";
import SupportedNetworkAndFarms from "@/components/SupportedNetworksAndFarms/SupportedNetworkAndFarms.vue";

export default {
  name: "SupportedNetworksAndFarms",
  components: {
    HeaderTopDashboard,
    SupportedNetworkAndFarms,
  },
  data: () => ({      
    search: '',
  }),
  computed: {
    ...mapGetters('generalStore', ['darkmode']),
    ...mapGetters('farmStore', ['farms']),
    loading: function() {
      return this.$store.state.farmStore.loading;
    },
    farmsByNetwork() {
      let farmsByNetwork = {};
      this.farms.forEach(farm => {
        if (this.search && farm.name.toLowerCase().includes(this.search.toLowerCase())) {
          if (farmsByNetwork.hasOwnProperty(farm.network)) {
            farmsByNetwork[farm.network].push(farm);
          } else {
            farmsByNetwork[farm.network] = [];
            farmsByNetwork[farm.network].push(farm);
          }
        } else if (!this.search) {
          if (farmsByNetwork.hasOwnProperty(farm.network)) {
            farmsByNetwork[farm.network].push(farm);
          } else {
            farmsByNetwork[farm.network] = [];
            farmsByNetwork[farm.network].push(farm);
          }
        }
      });
      return farmsByNetwork;
    },
  },
  created() {
    this.getFarms();
  },
  methods: {
    ...mapActions('farmStore', ['getFarms']),
  },
};
</script>
