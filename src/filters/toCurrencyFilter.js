import Vue from 'vue';

Vue.filter('toCurrency', (value, round) => {
  if (typeof value !== "number") {
    return value;
  }
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: round ? 2 : 18
  });
  return formatter.format(value);
});
