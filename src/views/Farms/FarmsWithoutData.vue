<template>
  <v-card
    class="mx-auto mx-5 pb-3 card-shadow"
    v-if="Object.keys(farmsWithoutData).length"
  >
    <v-card-text>
      <div>
        Farms We Couldn't Check
      </div>
    </v-card-text>
    <v-chip
      :color="farm.error ? 'red' : ''"
      v-for="(farm, key) in farmsWithoutData" :key="key"
      class="ma-2"
      close
      close-icon="fas fa-redo"
      :disabled="loading"
      @click:close="getPoolsForSingleFarm({ key, selectedFarm: farm })"
    >
      <v-icon left v-if="farm.error">
        fas fa-exclamation-circle
      </v-icon>
      {{ farm.name }} ({{ $t(farm.network) }})
    </v-chip>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "FarmsWithoutData",
  computed: {
    farmsWithoutData: function() {
      return this.$store.state.farmStore.farmsWithoutData;
    },
    loading: function() {
      return this.$store.state.poolStore.loading;
    },
  },
  methods: {
    ...mapActions('poolStore', ['getPoolsForSingleFarm']),
  },
};
</script>

<style scoped></style>
