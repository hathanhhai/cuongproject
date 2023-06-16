import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { router } from "./routes";
import "@/assets/styles/index.scss";
import i18n from "./langs/i18n";
import { optionsVueProgressBar, optionToast } from "./useConfig";
import VueProgressBar from "@aacassandra/vue3-progressbar";
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";
import { createPinia } from "pinia";
import VueCommon from "./utils/vueCommon";
const app = createApp(App);
const pinia = createPinia();
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Autocomplete from 'vue3-autocomplete'
// Optional: Import default CSS
import 'vue3-autocomplete/dist/vue3-autocomplete.css'

//*************Use Third party
loadFonts();

app.use(VueProgressBar, optionsVueProgressBar);
//**********Use
// app.config.errorHandler = () => null;
// app.config.warnHandler = () => null;
// app.use(VueViewer)
app.component('Autocomplete', Autocomplete)
app.use(VueSweetalert2);
app.mixin(VueCommon)
app.use(Toast, optionToast);
app.use(vuetify);
app.use(pinia);
app.use(i18n);
app.use(router);
app.mount("#app");
