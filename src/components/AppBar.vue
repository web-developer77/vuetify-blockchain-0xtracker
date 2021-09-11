<template>
  <div>
    <v-container fluid>
      <v-row class="d-flex">
        <v-col
          class="d-flex flex-column justify-space-between align-center"
          cols="12"
        >
          <SponsorsHeader />
          <v-btn
            elevation="0"
            :ripple="false"
            height="43"
            class="font-weight-600 text-capitalize drawer-toggler py-3 px-6 rounded-sm"
            :class="{
              'btn-dark-toggler-hover': !hasBg,
              'btn-toggler-hover': hasBg,
              active: togglerActive,
            }"
            v-if="$vuetify.breakpoint.mobile"
            color="transparent"
            @click="drawerClose"
          >
            <div class="drawer-toggler-inner">
              <i class="drawer-toggler-line" :class="{ 'bg-white': hasBg }"></i>
              <i class="drawer-toggler-line" :class="{ 'bg-white': hasBg }"></i>
              <i class="drawer-toggler-line" :class="{ 'bg-white': hasBg }"></i>
            </div>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import SponsorsHeader from "@/components/SponsorsHeader.vue";

export default {
  name: "app-bar",
  components: {
    SponsorsHeader,
  },
  props: {
    background: String,
    hasBg: Boolean,
    linkColor: String,
    toggleActive: Boolean,
  },
  data() {
    return {
      drawer: false,
      togglerActive: false,
    };
  },
  methods: {
    drawerClose() {
      this.togglerActive = !this.togglerActive;
      this.$emit("drawer-toggle", true);
    },
  },
  watch: {
    toggleActive(val) {
      this.togglerActive = val;
    },
  },
};
</script>
