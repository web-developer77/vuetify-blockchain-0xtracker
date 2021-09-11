<template>
  <v-row justify="center">
    <v-dialog
      v-model="walletDialog"
      persistent
      max-width="600"
    >
      <v-card :dark="darkmode" class="pt-5">
        <p class="text-h1 text-center mb-10">
          {{ connectedWallet ? 'Wallet Connected' : 'Connect your Wallet' }}
        </p>
        <v-card-text>
          <v-row v-if="connectedWallet" justify="space-around">
            <div class="text-center m-5">
              <v-btn
                class="mx-2 mb-1"
                fab
                large
              >
                <v-icon color="green">
                  fas fa-plug
                </v-icon>
              </v-btn>
              <p :class="{'text-white': darkmode}">{{ 'Connected to "' + connectedWallet + '" on "' + $t(connectedWalletNetwork) + '" network.' }}</p>
            </div>
          </v-row>
          <v-row v-else justify="space-around">
            <div class="text-center m-5">
              <v-btn
                class="mx-2 mb-1"
                fab
                large
                @click="connectWallet()"
              >
                <v-img
                  max-height="40"
                  max-width="40"
                  src="@/assets/images/icons/metamask-fox.svg"
                ></v-img>
              </v-btn>
              <p :class="{'text-white': darkmode}">
                MetaMask
              </p>
            </div>
            <div class="text-center m-5">
              <v-btn
                class="mx-2 mb-1"
                fab
                large
                @click="connectWallet()"
              >
                <v-img
                  max-height="40"
                  max-width="40"
                  src="@/assets/images/icons/twt.svg"
                ></v-img>
              </v-btn>
              <p :class="{'text-white': darkmode}">
                Trustwallet
              </p>
            </div>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="setWalletDialog(false)"
          >
            Close
          </v-btn>
        </v-card-actions>
        <v-overlay
          :absolute="absolute"
          opacity="0.95"
          :value="overlay"
          class="text-center"
        >
          <p class="mx-5">Please note that wallet functionality is still in BETA and you use it at your own risk. Contract functions have not been verified and might end up in a failed transaction.  If you experience this please come to our Telegram channel (<a class="text-white" href="https://t.me/bsc0xtracker" target="_blank">t.me/bsc0xtracker</a>) to report.</p>
          <v-checkbox
            v-model="termsAccepted"
            label="I understand the risks associated with the wallet functionality and would like to continue."
            class="mx-10"
          ></v-checkbox>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!termsAccepted"
            class="mx-5"
            @click="overlay = false"
          >
            Proceed
          </v-btn>
          <v-btn
            class="mx-5"
            @click="setWalletDialog(false)"
          >
            Cancel
          </v-btn>
        </v-overlay>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    absolute: true,
    overlay: true,
    termsAccepted: false,
  }),
  computed: {
    ...mapGetters('generalStore', ['darkmode', 'walletDialog']),
    ...mapGetters('walletStore', ['connectedWallet', 'connectedWalletNetwork']),
  },
  methods: {
    ...mapActions('generalStore', ['setWalletDialog']),
    ...mapActions('walletStore', ['connectWallet']),
  },
}
</script>