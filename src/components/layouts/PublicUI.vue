<template>
  <v-app>
    <PublicNavbar></PublicNavbar>
    <v-main class="pa-0 ma-0">
      <slot></slot>
    </v-main>
  </v-app>
</template>
<script>
import { useConfigStore } from "@/stores/configStore";
import { useTheme } from "vuetify/lib/framework.mjs";
import PublicNavbar from "./PublicNavbar.vue";

export default {
  name: "PublicUI",
  setup: () => ({
    configStore$: useConfigStore(),
    theme$: useTheme(),
  }),
  components: {
    PublicNavbar
},
  data: () => ({
    loading: true,
    UILang: "",
  }),
  mounted() {
    this.configStore$.loadLangAndTheme();
  },
  methods: {
  
  },
};
</script>
