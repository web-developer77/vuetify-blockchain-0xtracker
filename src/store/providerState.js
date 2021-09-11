import Vue from 'vue';

export const providerState = Vue.observable({
  provider : null,
});

export const providerActions = {
  setProvider(provider) {
    Vue.set(providerState, 'provider', provider);
  },
};