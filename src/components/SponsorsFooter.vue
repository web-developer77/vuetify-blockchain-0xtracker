<template>
  <div class="px-3">
    <v-container
    >
      <v-card class="card-shadow mb-6" :dark="darkmode">
        <div class="card-header-padding card-border-bottom card-shadow mb-5">
          <p class="font-weight-600 text-h3 mb-0 text-center" :class="{'text-muted': !darkmode}">
            Check Out Our Sponsors!
          </p>
        </div>
        <v-row
          align="center"
          no-gutters
          style="height: 100px;"
        >
          <v-col>
            <div class="text-center">
              <a href="https://jetswap.finance/" target="_blank">
                <v-avatar>
                  <v-img
                    max-height="50"
                    max-width="50"
                    src="@/assets/images/sponsors-footer/jetswap.png"
                  ></v-img>
                </v-avatar>
                <p :class="{'text-white': darkmode}">Jetswap</p>
              </a>
            </div>
          </v-col>
          <v-col>
            <div class="text-center">
              <a href="https://pancakehunny.finance/?utm_source=0xtracker.app&utm_medium=logo&utm_campaign=sept_2021" target="_blank">
                <v-avatar>
                  <v-img
                    max-height="50"
                    max-width="50"
                    src="@/assets/images/sponsors-footer/hunny.gif"
                  ></v-img>
                </v-avatar>
                <p :class="{'text-white': darkmode}">Pancake Hunny</p>
              </a>
            </div>
          </v-col>
          <v-col>
            <div class="text-center">
              <a href="http://kogefarm.io/" target="_blank">
                <v-avatar>
                  <v-img
                    max-height="50"
                    max-width="50"
                    src="@/assets/images/sponsors-footer/koge.png"
                  ></v-img>
                </v-avatar>
                <p :class="{'text-white': darkmode}">Koge Farm</p>
              </a>
            </div>
          </v-col>
        </v-row>
        <v-row
          align="center"
          no-gutters
          style="height: 100px;"
        >
          <v-col>
            <div class="text-center">
              <a href="https://polyquokka.finance/" target="_blank">
                <v-avatar>
                  <v-img
                    max-height="50"
                    max-width="50"
                    src="@/assets/images/sponsors-footer/quokka.svg"
                  ></v-img>
                </v-avatar>
                <p :class="{'text-white': darkmode}">PolyQuokka</p>
              </a>
            </div>
          </v-col>
          <v-col>
            <div class="text-center">
              <a href="https://shibanova.io/" target="_blank">
                <v-avatar>
                  <v-img
                    max-height="50"
                    max-width="50"
                    src="@/assets/images/sponsors-footer/coin.png"
                  ></v-img>
                </v-avatar>
                <p :class="{'text-white': darkmode}">ShibaNova</p>
              </a>
            </div>
          </v-col>
          <v-col>
            <div class="text-center">
              <a href="https://timeleap.finance/" target="_blank">
                <v-avatar>
                  <v-img
                    max-height="50"
                    max-width="50"
                    src="@/assets/images/sponsors-footer/timeleap.gif"
                  ></v-img>
                </v-avatar>
                <p :class="{'text-white': darkmode}">Timeleap</p>
              </a>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    alignments: [
      'start',
      'center',
      'end',
    ],
  }),
  computed: {
    ...mapGetters('generalStore', ['darkmode']),
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>>
