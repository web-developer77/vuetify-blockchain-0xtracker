<template>
  <div>
    <Rev0xForm />
    <HeaderTopDashboard />
    <v-container fluid class="pt-0 px-6 mt-n13">
      <v-row class="mt-0">
        <v-col cols="12" lg="12" class="pt-6">
          <v-card class="card-shadow mb-6" :dark="darkmode">
            <div class="card-header-padding card-border-bottom card-shadow">
              <p class="font-weight-600 text-h3 mb-0" :class="{'text-muted': !darkmode}">
                Rev0x
              </p>
            </div>
            <v-card-text v-if="approvalsSortedByAmount.length" class="px-0 py-0">
              <v-expansion-panels accordion hover multiple>
                <v-expansion-panel
                  v-for="(approval, key) in approvalsSortedByAmount" :key="key"
                >
                  <v-expansion-panel-header>
                    {{ approval.tokenData.tkn0s }}{{approval.tokenData.tkn1s ? '/' + approval.tokenData.tkn1s : ''}} ({{ $t(approval.network) }}){{ approval.balance ? ' - ' + approval.balance : '' }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-data-table
                      :headers="headers"
                      :items="approval.contractsArr"
                      hide-default-footer
                      :page.sync="page"
                      class="table"
                      @page-count="pageCount = $event"
                    >
                      <template v-slot:item.contractId="{ item }">
                        {{ item.friendlyName || item.contractId | shortenContract }}
                        <v-btn v-if="approval.network === 'bsc'" :href="'https://bscscan.com/address/' + item.contractId" target="_blank" icon color="#5e72e4">
                          <v-icon size="14">fas fa-external-link-alt</v-icon>
                        </v-btn>
                        <v-btn v-else-if="approval.network === 'matic'" :href="'https://polygonscan.com/address/' + item.contractId" target="_blank" icon color="#5e72e4">
                          <v-icon size="14">fas fa-external-link-alt</v-icon>
                        </v-btn>
                        <v-btn v-else-if="approval.network === 'ftm'" :href="'https://ftmscan.com/address/' + item.contractId" target="_blank" icon color="#5e72e4">
                          <v-icon size="14">fas fa-external-link-alt</v-icon>
                        </v-btn>
                      </template>
                      <template v-slot:item.management="{ item }" class="text-center">
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon :color="searchedWallet === connectedWallet ? '#5e72e4' : ''">
                              <v-icon
                                v-bind="attrs"
                                v-on="on"
                                size="14"
                                class="me-2 cursor-pointer"
                                @click="revokePermissions({ token: approval.tokenID, spender: item.contractId })"
                                >
                                fas fa-ban
                              </v-icon>
                            </v-btn>
                          </template>
                          <span>Revoke Permissions</span>
                        </v-tooltip>
                      </template>
                    </v-data-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
            <v-card-text v-else class="text-center">
              <p v-if="loading">Loading...</p>
              <p v-else>No data available...</p>
            </v-card-text>
            <v-overlay
              :absolute="true"
              :value="loading"
            >
              <div class="text-center">
                <v-progress-circular
                  indeterminate
                  color="white"
                  :opacity="1"
                />
              </div>
            </v-overlay>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import HeaderTopDashboard from "@/components/HeaderTopDashboard.vue";
import Rev0xForm from '@/views/Forms/Rev0xForm.vue'

export default {
  components: {
    HeaderTopDashboard,
    Rev0xForm
  },
  data() {
    return {
      headers: [
        {
          text: 'Contract',
          align: 'center',
          sortable: true,
          value: 'contractId',
        },
        {
          text: 'Approval Amount',
          align: 'center',
          sortable: true,
          value: 'lastTx.amount',
        },
        {
          text: 'Block',
          align: 'center',
          sortable: true,
          value: 'lastTx.block_number',
        },
        {
        sortable: false,
        text: "Revoke",
        value: "management",
        align: "center"
      }
      ],
      page: 1,
      pageCount: 0,
    };
  },
  computed: {
    ...mapGetters('approvalsStore', ['searchedWallet', 'wallet']),
    ...mapGetters('farmStore', ['farms']),
    ...mapGetters('generalStore', ['darkmode']),
    ...mapGetters('walletStore', ['connectedWallet']),
    loading: function() {
      return this.$store.state.farmStore.loading || this.$store.state.approvalsStore.loading;
    },
    approvals() {
      let approvals = [];
      if (this.$store.state.approvalsStore.approvals && Object.keys(this.$store.state.approvalsStore.approvals).length) {
        for (const tokenId in this.$store.state.approvalsStore.approvals) {
          if (Object.hasOwnProperty.call(this.$store.state.approvalsStore.approvals, tokenId)) {
            let approval = this.$store.state.approvalsStore.approvals[tokenId];
            for (const contractId in approval.contracts) {
              if (Object.hasOwnProperty.call(approval.contracts, contractId)) {
                let contract = approval.contracts[contractId];
                if (!approval.contractsArr) approval.contractsArr = [];
                contract.contractId = contractId;
                if (contract.tx && contract.tx.length > 1) {
                  const lastTx = contract.tx[contract.tx.length - 1][0];
                  if (lastTx.amount) {
                    for (const farm in this.farms) {
                      if (Object.hasOwnProperty.call(this.farms, farm)) {
                        const farmData = this.farms[farm];
                        if (farmData.sendValue.toLowerCase() === lastTx.contractApproved.toLowerCase()) {
                          contract.friendlyName = farmData.name;
                        }
                      }
                    }
                    contract.lastTx = lastTx;
                  }
                } else if (contract.tx && contract.tx.length === 1) {
                  const lastTx = contract.tx[0];
                  if (lastTx.amount) {
                    for (const farm in this.farms) {
                      if (Object.hasOwnProperty.call(this.farms, farm)) {
                        const farmData = this.farms[farm];
                        if (farmData.sendValue.toLowerCase() === lastTx.contractApproved.toLowerCase(), farmData.sendValue.toLowerCase() === lastTx.contractApproved.toLowerCase()) {
                          contract.friendlyName = farmData.name;
                        }
                      }
                    }
                    contract.lastTx = lastTx;
                  }
                }
                if (contract.lastTx) {
                  delete contract.tx;
                  approval.contractsArr.push(contract);
                }
              }
            }
            delete approval.contracts;
            if (approval.contractsArr.length) approvals.push(this.$store.state.approvalsStore.approvals[tokenId])
          }
        }
      }
      return approvals;
    },
    approvalsSortedByAmount() {
      return this.approvals.sort((a,b) => (a.balance < b.balance) ? 1 : ((b.balance < a.balance) ? -1 : 0));
    }
  },
  created() {
    this.getFarms();
  },
  methods: {
    ...mapActions('approvalsStore', ['revokePermissions']),
    ...mapActions('farmStore', ['getFarms']),
  },
};
</script>
