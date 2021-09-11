const generalStore = {
  namespaced: true,
  state: {
    alerts: [],
    darkmode: false,
    loading: false,
    noLPPools: true,
    round: true,
    smallValues: true,
    version: 5,
    walletDialog: false,
  },
  getters: {
    alerts: state => state.alerts,
    darkmode: state => state.darkmode,
    // TODO: reference all loading states in this loading state
    loading: state => state.loading,
    noLPPools: state => state.noLPPools,
    round: state => state.round,
    smallValues: state => state.smallValues,
    walletDialog: state => state.walletDialog,
  },
  mutations: {
    ADD_ALERT(state, alert) {
      state.alerts.push(alert);
      const timer = window.setInterval(() => {
        if (state.alerts.length > 0) {
          this.commit('generalStore/REMOVE_ALERT', null, { root: true });
        } else {
          window.clearInterval(timer);
        }
      }, 12 * 1000);
    },
    REMOVE_ALERT(state) {
      state.alerts.shift();
    },
    SET_DARK_MODE(state, value) {
      state.darkmode = value;
    },
    SET_NO_LP_POOLS(state, value) {
      state.noLPPools = value;
    },
    SET_ROUNDING(state, value) {
      state.round = value;
    },
    SET_SMALL_VALUES(state, value) {
      state.smallValues = value;
    },
    SET_VERSION(state, value) {
      state.version = value;
    },
    SET_WALLET_DIALOG(state, value) {
      state.walletDialog = value;
    },
    TOGGLE_DARK_MODE(state) {
      state.darkmode = !state.darkmode;
    },
    TOGGLE_NO_LP_POOLS(state) {
      state.noLPPools = !state.noLPPools;
    },
    TOGGLE_ROUNDING(state) {
      state.round = !state.round;
    },
    TOGGLE_SMALL_VALUES(state) {
      state.smallValues = !state.smallValues;
    },
  },
  actions: {
    initStore({ commit, state }) {
      try {
        if (localStorage.getItem('store')) {
          const storedStore = JSON.parse(localStorage.getItem('store'));
          if (!storedStore.version || storedStore.version < state.version) {
            localStorage.removeItem('store');
          } else this.dispatch('generalStore/restoreSession', storedStore);
          this.dispatch('generalStore/saveSession');
        } else {
          // Check if system theme is dark
          const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
          if (darkThemeMq.matches) {
            commit('SET_DARK_MODE', true);
          } else {
            commit('SET_DARK_MODE', false);
          }
          this.dispatch('generalStore/saveSession');
        }
      } catch (error) {
        commit('generalStore/ADD_ALERT', 'An error occurred when attempting to initialise the app. ', { root: true });
      }
    },
    restoreSession({ commit }, sessionToRestore) {
      if (sessionToRestore.darkmode) commit('SET_DARK_MODE', sessionToRestore.darkmode)
      if (sessionToRestore.noLPPools) commit('SET_NO_LP_POOLS', sessionToRestore.noLPPools)
      if (sessionToRestore.round) commit('SET_ROUNDING', sessionToRestore.round)
      if (sessionToRestore.smallValues) commit('SET_SMALL_VALUES', sessionToRestore.smallValues)
      if (sessionToRestore.version) commit('SET_VERSION', sessionToRestore.version)
      if (sessionToRestore.wallet) commit('walletStore/SET_WALLET', sessionToRestore.wallet, { root: true })
      if (sessionToRestore.selectedFarms) commit('farmStore/SET_SELECTED_FARMS', sessionToRestore.selectedFarms, { root: true })
    },
    setWalletDialog({ commit }, value) {
      commit('SET_WALLET_DIALOG', value);
    },
    saveSession({ rootState, state }) {
      const sessionToStore = {
        darkmode: state.darkmode,
        noLPPools: state.noLPPools,
        round: state.round,
        smallValues: state.smallValues,
        version: state.version,
        wallet: rootState.walletStore.wallet,
        selectedFarms: rootState.farmStore.selectedFarms,
      }
      localStorage.setItem('store', JSON.stringify(sessionToStore));
    },
    toggleDarkMode({ commit }) {
      commit('TOGGLE_DARK_MODE');
      this.dispatch('generalStore/saveSession');
    },
    toggleNoLPPools({ commit }) {
      commit('TOGGLE_NO_LP_POOLS');
      this.dispatch('generalStore/saveSession');
    },
    toggleRounding({ commit }) {
      commit('TOGGLE_ROUNDING');
      this.dispatch('generalStore/saveSession');
    },
    toggleSmallValues({ commit }) {
      commit('TOGGLE_SMALL_VALUES');
      this.dispatch('generalStore/saveSession');
    },
  }
};

export default generalStore;
