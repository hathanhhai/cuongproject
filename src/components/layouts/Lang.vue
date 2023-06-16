<template lang="">
  <v-btn variant="text" @click="changeLang()">
    {{ configStore$.lang == "en" ? (text ? "Tiếng Việt" : "VN") : text ? "ENGLISH" : "EN" }}
  </v-btn>
</template>
<script>
import { useConfigStore } from "@/stores/configStore";
import { DEFAULT_LANG } from "@/useConfig";
export default {
  props: { text: false },
  setup: () => ({
    configStore$: useConfigStore(),
  }),
  methods: {
    changeLang() {
      if (this.configStore$.lang == DEFAULT_LANG) {
        this.configStore$.setLang("en");
      } else {
        this.configStore$.setLang(DEFAULT_LANG);
      }
    },
  },
};
</script>
<style lang=""></style>
