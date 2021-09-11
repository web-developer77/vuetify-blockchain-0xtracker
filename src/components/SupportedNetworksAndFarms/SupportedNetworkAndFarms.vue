<template>
  <v-card class="card-shadow mb-30" :dark="darkmode">
    <div class="card-header-padding card-border-bottom">
      <v-row>
        <v-col>
          <p class="font-weight-600 text-h3 mb-0">{{ $t(network) }}</p>
        </v-col>
        <v-col class="text-right">
          {{ $tc('farm', farms.length, { count: farms.length }) }}
        </v-col>
      </v-row>
    </div>
    <v-card-text class="card-padding card-shadow">
      <v-card-text class="px-0 py-0">
        <v-data-table
          :headers="headers"
          :items="farms"
          hide-default-footer
          :page.sync="page"
          class="table"
          mobile-breakpoint="0"
          @page-count="pageCount = $event"
          sort-by="name"
          :sort-desc="false"
        >
          <template v-slot:item.featured="{ item }">
            <v-icon color="green" v-if="item.featured === 1" class="pr-1">mdi-star-face</v-icon>
            <v-icon v-else class="pr-1">mdi-emoticon-sad</v-icon>
          </template>
        </v-data-table>
      </v-card-text>
      <div class="card-padding d-flex justify-end">
        <v-pagination
          prev-icon="fa fa-angle-left"
          next-icon="fa fa-angle-right"
          class="pagination"
          color="#5e72e4"
          v-model="page"
          :length="pageCount"
          circle
        ></v-pagination>
      </div>
    </v-card-text>
    <v-overlay
      :absolute="true"
      :value="loading"
    >
      <div class="text-center">
        <v-progress-circular
          indeterminate
          color="white"
        ></v-progress-circular>
      </div>
    </v-overlay>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: "SupportedNetworkAndFarms",
  props: {
    network: String,
    farms: Array,
  },
  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'center',
          sortable: true,
          value: 'name',
        },
        // { text: 'Network', value: 'network', align: 'center', },
        { text: 'Featured', value: 'featured', align: 'center', },
      ],
      page: 1,
      pageCount: 0,
    };
  },
  computed: {
    ...mapGetters('generalStore', ['darkmode']),
    loading: function() {
      return this.$store.state.farmStore.loading;
    },
  },
};
</script>
