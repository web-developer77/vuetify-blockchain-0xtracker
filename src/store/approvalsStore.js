import Vue from "vue";
import axios from "axios";
import { ethers } from "ethers";

// If we get CORS errors we can override them with this
axios.interceptors.response.use((response) => response, (error) => {
  if (typeof error.response === 'undefined') 'override undefined error response (cors)';
});

const APPROVAL_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

const approvalsStore = {
  namespaced: true,
  state: {
    approvals: {},
    loading: false,
    networkRules: [
      value => !!value || 'Required.',
      value => (value && value.length >= 1) || 'Min 1 network.',
    ],
    searchedWallet: '',
    selectedNetwork: '',
    wallet: '',
  },
  getters: {
    approvals: state => state.approvals,
    searchedWallet: state => state.searchedWallet,
    selectedNetwork: state => state.selectedNetwork,
    wallet: state => state.wallet,
  },
  mutations: {
    SET_APPROVALS(state, value) {
      Vue.set(state, 'approvals', value);
    },
    SET_LOADING(state, value) {
      state.loading = value;
    },
    SET_SELECTED_NETWORK(state, value) {
      state.selectedNetwork = value;
    },
    SET_SEARCHED_WALLET(state, value) {
      state.searchedWallet = value;
    },
    SET_WALLET(state, value) {
      state.wallet = value;
    },
  },
  actions: {
    async getApprovals({ commit }, { wallet, network} ) {
      try {
        commit('SET_LOADING', true);
        commit('SET_APPROVALS', {});
        const requestBody = { wallet, network };
        const response = await axios.post(process.env.VUE_APP_APPROVALS_URL, requestBody);
        if (!response || !response.data || response.data.error) throw `There was an error in the response when attempting to get approvals. ${response.data.error}`;
        if (Object.keys(response.data && response.data.approvals).length) {
          commit('SET_SEARCHED_WALLET', response.data.userInfo.wallet);
          commit('SET_APPROVALS', response.data.approvals);
        } else commit('SET_APPROVALS', {});
        commit('SET_LOADING', false);
      } catch (error) {
        commit('generalStore/ADD_ALERT', error, { root: true });
        commit('SET_LOADING', false);
      }
    },
    revokePermissions({ commit, rootGetters, rootState, state }, { token, spender }) {
      try {
        commit('SET_LOADING', true);
        if (!rootGetters['walletStore/connectedWalletProvider']) throw 'No wallet provider detected. Did you connect your Wallet?';
        if (state.searchedWallet !== rootState.walletStore.connectedWallet) throw 'The connected Wallet and the Wallet you want to revoke permissions for are not the same.';
        const provider = rootGetters['walletStore/connectedWalletProvider'];
        const signer = provider.getSigner();
        const contract = new ethers.Contract(token, APPROVAL_ABI, signer);
        contract.approve(spender, 0, { gasLimit: 500000 })
        .then(async (t) => {
          await provider.waitForTransaction(t.hash);
          commit('generalStore/ADD_ALERT', 'Permissions revoked successfully.  Give it some time to reflect in the UI.', { root: true });
          commit('SET_LOADING', false);
          return Promise.resolve(true);
        })
        .catch((error) => {
          commit('generalStore/ADD_ALERT', `An error occurred with the transaction. Error: ${error.message || error}`, { root: true });
          commit('SET_LOADING', false);
          return Promise.reject(error);
        })
      } catch (error) {
        commit('generalStore/ADD_ALERT', error, { root: true });
        commit('SET_LOADING', false);
      }
    },
    setSelectedNetwork({ commit }, network) {
      commit('SET_SELECTED_NETWORK', network);
    },
    setWallet({ commit }, wallet) {
      commit('SET_WALLET', wallet);
    },
  }
};

export default approvalsStore;
