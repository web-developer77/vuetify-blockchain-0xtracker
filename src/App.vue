<template>
  <router-view></router-view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
  },
  computed: {
    ...mapGetters('generalStore', ['darkmode']),
  },
  created() {
    this.initStore();
    console.log("Ask not that events should happen as you will, but let your will be that events should happen as they do, and you shall have peace.")
  },
  methods: {
    ...mapActions('generalStore', ['initStore'])
  }
};
</script>
