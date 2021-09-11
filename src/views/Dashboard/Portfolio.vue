<template>
  <div>
    <HorizontalForm />
    <HeaderTopDashboard :showRefresh="true">
      <ValueCards />
    </HeaderTopDashboard>
    <v-container fluid class="pt-0 px-6 mt-n13">
      <v-row class="mt-0">
        <v-col cols="12" lg="12" class="pt-6">
          <v-card class="card-shadow mb-6" :dark="darkmode">
            <div class="card-header-padding card-border-bottom">
              <p class="font-weight-600 text-h3 mb-0" :class="{'text-muted': !darkmode}">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      @click="showWallet = !showWallet"
                      v-bind="attrs"
                      v-on="on"
                      class="mr-1 pb-1"
                    >
                      {{ showWallet ? 'fas fa-eye-slash' : 'fas fa-eye' }}
                    </v-icon>
                  </template>
                  <span v-if="showWallet">Hide Wallet Details</span>
                  <span v-else>Show Wallet Details</span>
                </v-tooltip>
                Wallet
              </p>
            </div>

            <v-card-text class="px-0 py-0">
              <v-slide-y-transition>
                <div v-show="showWallet">
                  <Wallet />
                </div>
              </v-slide-y-transition>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" lg="12" class="pt-6">
          <v-card class="card-shadow mb-6" :dark="darkmode">
            <div class="card-header-padding card-border-bottom">
              <p class="font-weight-600 text-h3 mb-0" :class="{'text-muted': !darkmode}">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      @click="showFarms = !showFarms"
                      v-bind="attrs"
                      v-on="on"
                      class="mr-1 pb-1"
                    >
                      {{ showFarms ? 'fas fa-eye-slash' : 'fas fa-eye' }}
                    </v-icon>
                  </template>
                  <span v-if="showFarms">Hide Farms Details</span>
                  <span v-else>Show Farms Details</span>
                </v-tooltip>
                Farms
              </p>
            </div>

            <v-card-text class="px-0 py-0">
              <v-slide-y-transition>
                <div v-show="showFarms">
                  <FarmsWithoutData />
                  <Farms />
                </div>
              </v-slide-y-transition>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HorizontalForm from '@/views/Forms/HorizontalForm.vue'
import HeaderTopDashboard from "@/components/HeaderTopDashboard.vue";
import ValueCards from "@/views/Dashboard/Widgets/ValueCards.vue";
import Wallet from "@/views/Wallet/Wallet.vue";
import Farms from "@/views/Farms/Farms.vue";
import FarmsWithoutData from "@/views/Farms/FarmsWithoutData.vue";

export default {
  name: "Dashboard",
  components: {
    HorizontalForm,
    HeaderTopDashboard,
    ValueCards,
    Wallet,
    Farms,
    FarmsWithoutData,
  },
  data: function () {
    return {
      showWallet: true,
      showFarms: true,
    };
  },
  computed: {
    ...mapGetters('generalStore', ['darkmode']),
  },
};
</script>
