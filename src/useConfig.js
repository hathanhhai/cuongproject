import { TYPE } from "vue-toastification";
// import i18n from "@/langs/i18n";
// import { useTheme } from "vuetify";
export const DEFAULT_LANG = "vn";
export const LANG_VN = "vn";
export const LANG_EN = "en";
export const DEFAULT_THEME = "light";

export const ROUTER_HOME = "home";
export const ROUTER_CUONG = "cuong";


export const optionsVueProgressBar = {
  color: "#9155FD",
  failedColor: "#FF4F57",
  thickness: "3px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};

export const optionToast = {
  toastDefaults: {
    closeButtonClassName: "closeButtonClassName",
    // ToastOptions object for each type of toast
    [TYPE.ERROR]: {
      timeout: 6000,
    },
    [TYPE.SUCCESS]: {
      timeout: 2000,
    },
    [TYPE.INFO]: {
      timeout: 2000,
    },
  },
};

// export function loadLangAndThemeLocalStorage() {
//   const nameConfig = 'config'
//   let vuetifyTheme = useTheme();
//   if (localStorage.getItem(nameConfig)) {
//     let config = JSON.parse(localStorage.getItem(nameConfig));
//     if(config?.lang){
//       i18n.global.locale = config.lang;
//     }
//     if(config?.theme){
//       vuetifyTheme.global.name.value = config.theme;
//     }
//   }
// }
