import Vue from 'vue';
import Vuex from 'vuex';
import approvalsStore from '@/store/approvalsStore';
import farmStore from '@/store/farmStore';
import generalStore from '@/store/generalStore';
import networkStore from '@/store/networkStore';
import poolStore from '@/store/poolStore';
import walletStore from '@/store/walletStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    approvalsStore,
    farmStore,
    generalStore,
    networkStore,
    poolStore,
    walletStore,
  },
  strict: true,
});
