import { defineStore } from "pinia";
import i18n from "../langs/i18n";
import { useTheme } from "vuetify";
const nameStore = "config";
import { DEFAULT_LANG, DEFAULT_THEME } from "@/useConfig";
export const useConfigStore = defineStore("config", {
  state: () => ({
    lang: localStorage.getItem(nameStore) ? localStorage.getItem(nameStore).lang : DEFAULT_LANG,
    theme: localStorage.getItem(nameStore) ? localStorage.getItem(nameStore).theme : DEFAULT_THEME,
    drawerState: true,
    isShowSideBarAdmin: false,
    filter: {
      log: "",
      transaction: "",
    },
  }),

  actions: {
    setIsShowSideBarAdmin(value) {
      this.isShowSideBarAdmin = value;
    },
    setFilterLog(filter) {
      this.filter.log = filter;
    },
    resetFilterLog() {
      this.filter.log = "";
    },
    setDrawerState() {
      this.drawerState = !this.drawerState;
    },
    closeDrawerMenu() {
      this.drawerState = false;
    },
    loadLangAndTheme() {
      let vuetifyTheme = useTheme();
      if (localStorage.getItem(nameStore)) {
        let config = JSON.parse(localStorage.getItem(nameStore));
        if (config?.theme) {
          vuetifyTheme.global.name.value = config.theme;
          this.theme = config.theme;
        } else {
          this.theme = DEFAULT_THEME;
        }
        if (config?.lang) {
          i18n.global.locale = config.lang;
          this.lang = config.lang;
        } else {
          this.lang = DEFAULT_LANG;
        }
      } else {
        let setLocalStore = {
          lang: DEFAULT_LANG,
          theme: DEFAULT_THEME,
        };
        console.log(setLocalStore);
        this.lang = setLocalStore.lang;
        localStorage.setItem(nameStore, JSON.stringify(setLocalStore));
      }
    },
    setLang(lang) {
      if (!lang) {
        i18n.global.locale = DEFAULT_LANG;
        return;
      }
      try {
        this.lang = lang;
        if (localStorage.getItem(nameStore)) {
          let main = JSON.parse(localStorage.getItem(nameStore));
          main.lang = lang;
          localStorage.setItem(nameStore, JSON.stringify(main));
        } else {
          localStorage.setItem(nameStore, JSON.stringify({ lang: lang }));
        }
        i18n.global.locale = lang;
      } catch (e) {
        localStorage.removeItem(nameStore);
        this.setLang(lang);
      }
    },
    setTheme(theme) {
      // try {
      this.theme = theme;
      if (localStorage.getItem(nameStore)) {
        let main = JSON.parse(localStorage.getItem(nameStore));
        main.theme = theme;
        localStorage.setItem(nameStore, JSON.stringify(main));
      } else {
        localStorage.setItem(nameStore, JSON.stringify({ theme: theme }));
      }
      // } catch (e) {
      // console.log(e)
      //   localStorage.removeItem(nameStore);
      //   this.setTheme(theme);
      // }
    },
  },
});
