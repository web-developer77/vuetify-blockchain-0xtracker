<template>
  <v-row class="d-flex justify-center mt-n16">
    <v-col cols="12" md="8">
      <VerticalForm class="pb-5" />
      <SponsorsFooter />
      <v-btn
        @click="toggleDarkMode()"
        :dark="darkmode"
        fixed
        bottom
        right
        fab
      >
        <v-icon v-if="darkmode">mdi-weather-sunny</v-icon>
        <v-icon v-else>mdi-weather-night</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VerticalForm from '@/views/Forms/VerticalForm.vue'
import SponsorsFooter from '@/components/SponsorsFooter.vue'

export default {
  components: {
    VerticalForm,
    SponsorsFooter,
  },
  props: {
    showEasySubmit: Boolean,
  },
  computed: {
    ...mapGetters('generalStore', ['darkmode']),
  },
  methods: {
    ...mapActions('generalStore', ['toggleDarkMode']),
  }
};
</script>

<style scoped></style>
