<template>
  <div>
    <HeaderTopDashboard />
    <v-container class="px-6 mt-n16">
      <v-row>
        <v-col class="mx-auto pt-0" lg="8">
          <v-card class="card-shadow mb-30" :dark="darkmode">
            <v-card-text class="card-padding">
            <v-card-text>
              <v-chip
                class="ma-2"
                @click="toggleDarkMode"
              >
                <v-icon v-if="darkmode" class="pr-1">mdi-weather-night</v-icon>
                <v-icon v-else class="pr-1">mdi-weather-sunny</v-icon>
                {{ darkmode ? 'Dark' : 'Light' }} Mode
              </v-chip>
              <v-chip
                class="ma-2"
                @click="toggleRounding"
              >
                <v-icon v-if="round" class="pr-1">mdi-decimal</v-icon>
                <v-icon v-else class="pr-1">mdi-decimal-increase</v-icon>
                {{ round ? 'Rounded' : 'No Rounding'}}
              </v-chip>
              <v-chip
                class="ma-2"
                @click="toggleSmallValues"
              >
                <v-icon v-if="smallValues" class="pr-1">mdi-less-than</v-icon>
                <v-icon v-else class="pr-1">mdi-greater-than</v-icon>
                {{ smallValues ? 'Small Values' : 'No Small Values'}}
              </v-chip>
              <v-chip
                class="ma-2"
                @click="toggleNoLPPools"
              >
                <v-icon v-if="noLPPools" class="pr-1">mdi-water-plus</v-icon>
                <v-icon v-else class="pr-1">mdi-water-minus</v-icon>
                {{ noLPPools ? 'Empty Pools' : 'No Empty Pools'}}
              </v-chip>
            </v-card-text>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import HeaderTopDashboard from "@/components/HeaderTopDashboard.vue";

export default {
  name: "Settings",
  components: {
    HeaderTopDashboard,
  },
  computed: {
    ...mapGetters('generalStore', ['darkmode', 'noLPPools', 'round', 'smallValues']),
  },
  methods: {
    ...mapActions('generalStore', ['toggleDarkMode', 'toggleNoLPPools', 'toggleRounding', 'toggleSmallValues']),
  }
};
</script>
