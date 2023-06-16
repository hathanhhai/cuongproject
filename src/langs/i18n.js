import { createI18n } from "vue-i18n";
import vn from "./vn.json";
import en from "./en.json";
import { DEFAULT_LANG } from "@/useConfig";
const lang = localStorage.getItem("config") ? JSON.parse(localStorage.getItem("config")).lang : DEFAULT_LANG;
const i18n = createI18n({
  locale: lang,
  messages: {
    en: en,
    vn: vn,
  },
});

export default i18n;
