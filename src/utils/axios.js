import axios from "axios";
import { encryptStorage } from "./encryptLocalStorage";
import { router } from "@/routes";
import { useToast } from "vue-toastification";
import i18n from "@/langs/i18n";
const toast$ = useToast();
const Api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL + "/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});



export default Api;
