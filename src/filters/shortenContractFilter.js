import Vue from 'vue';

Vue.filter('shortenContract', (value) => {
  if (value && value.length > 7) {
    return value.slice(0,6) + '...' + value.slice(-4);
  } else return value;
});
