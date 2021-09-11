<template>
  <span>
    <template v-if="auth">
      <v-footer color="transparent" class="mt-10 pt-10 pb-5">
        <v-card class="flex" color="transparent">
          <v-card-text class="px-0">
            <v-row>
              <v-col cols="12" md="6">
                <div class="copyright text-body-2 ls-0 text-muted">
                  &copy; {{ new Date().getFullYear() }} 0xTracker
                </div>
              </v-col>

              <v-col cols="12" md="6" class="d-flex justify-end">
                <ul
                  v-for="item in footer"
                  :key="item.linkName"
                  class="d-flex list-style-none"
                >
                  <li>
                    <a
                      :href="item.link"
                      class="text-decoration-none text-muted text-body-2 ls-0 btn-hover no-default-hover"
                      target="_blank"
                      >{{ item.linkName }}</a
                    >
                  </li>
                </ul>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-footer>
    </template>

    <template v-else>
      <v-footer color="transparent" class="px-6">
        <v-card class="flex" color="transparent">
          <v-card-text class="px-0">
            <v-row>
              <v-col cols="12" md="6">
                <div
                  class="copyright text-body-2 ls-0"
                  :class="{'text-muted': darkmode, 'text-white': !darkmode}"
                >
                  &copy; {{ new Date().getFullYear() }} 0xTracker
                </div>
              </v-col>

              <v-col cols="12" md="6" class="d-flex justify-end">
                <ul
                  v-for="item in footer"
                  :key="item.linkName"
                  class="d-flex list-style-none"
                >
                  <li>
                    <a
                      :href="item.link"
                      class="text-decoration-none text-body-2 ls-0"
                      :class="{'text-muted btn-dark-hover no-default-hover': darkmode, 'text-white': !darkmode}"
                      target="_blank"
                      >{{ item.linkName }}</a
                    >
                  </li>
                </ul>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-footer>
    </template>
  </span>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: "content-footer",
  props: {
    auth: Boolean,
  },
  data() {
    return {
      footer: [
        {
          linkName: "Twitter",
          link: "https://twitter.com/0x_tracker/",
        },
        {
          linkName: "Telegram",
          link: "https://t.me/bsc0xtracker",
        },
        {
          linkName: "Donate",
          link: "https://bscscan.com/address/0xE0d0a6F70f13dB9193a815793242C98C3092a932",
        },
        {
          linkName: "Bugs/Request",
          link: "https://0xtracker.hellonext.co/roadmap",
        },
      ],
    };
  },
  computed: {
    ...mapGetters('generalStore', ['darkmode']),
  },
};
</script>
