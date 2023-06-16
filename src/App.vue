<template>
  <vue-progress-bar></vue-progress-bar>
  <router-view v-slot="{ Component }">
    <v-slide-y-transition>
      <component v-if="!loading" :is="Component" />
    </v-slide-y-transition>
  </router-view>
</template>

<script>
import { useConfigStore } from "./stores/configStore";

export default {
  name: "App",
  setup: () => ({
    configStore$: useConfigStore(),
  }),
  components: {
    // HomePage
  },

  data: () => ({
    loading: true,
    snackbar: true,
  }),
  created() {},
  mounted() {
    var _this = this;


      _this.loadInitialFunctionStore();
  },

  methods: {
    async loadInitialFunctionStore() {
      try {
        var _this = this;
        var router = "";
        this.configStore$.loadLangAndTheme();
      
        // this.walletStore$.loadWalletsAndUser();
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    },
  },
  computed: {},
};
</script>
