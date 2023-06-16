import { useConfigStore } from "@/stores/configStore";

import {
  LANG_EN,
  LANG_VN,

} from "@/useConfig";
import { useToast } from "vue-toastification";
import { useTheme } from "vuetify/lib/framework.mjs";

const VueCommon = {
  setup: () => ({}),
  data() {
    return {
      theme$: useTheme(),
      toast$: useToast(),
      configStore$: useConfigStore(),

      defaultIcon:'default.png',

      allowImages: ["png", "jpg", "jpge", "PNG", "JPG", "JPEG", "pdf", "PDF", "pdf"],
      allowFileIcon: ["png", "PNG"],
      allowINotmages: ["pdf", "PDF", "pdf"],
      baseUrl: process.env.VUE_APP_BASE_URL,
      LANG_EN: LANG_EN,
      LANG_VN: LANG_VN,

      
      APP_DOMAIN: process.env.VUE_APP_DOMAIN,
    };
  },
  methods: {
    calImagesFlex(images) {
      if (images.length > 0) {
        let length = images.length;
        let divisionConstant = length > 3 ? 24 : 12;
        let constantRoundValue = length >= 2 ? 2 : 3;
        let flexEachImage = divisionConstant / length;
        if (flexEachImage % 1 === 0) {
          let valuePlus = flexEachImage + constantRoundValue;
          let remainValue = (divisionConstant - valuePlus) / (length - 1);
          images.map((item, index) => {
            if (index == 0) {
              item.flex = valuePlus;
            } else {
              item.flex = remainValue;
            }
          });
        } else {
          let valuePlus =
            parseInt(flexEachImage) + Math.round(((flexEachImage % 2) - parseInt(flexEachImage % 2)) * length);
          let remainValue = parseInt(flexEachImage);
          images.map((item, index) => {
            if (index == 0) {
              item.flex = Math.round(valuePlus);
            } else {
              item.flex = Math.round(remainValue);
            }
          });
        }
      }
      return images;
    },
    slugify(text) {
      return text
        .toString() // Cast to string (optional)
        .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
        .toLowerCase() // Convert the string to lowercase letters
        .trim() // Remove whitespace from both sides of a string (optional)
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-"); // Replace multiple - with single -
    },
    mappingResponse(resource, object) {
      if (!object.hasOwnProperty("pagination")) {
        object.pagination = {};
      }
      object.data = resource.hasOwnProperty("data") ? resource.data : [];
      for (var key in object.pagination) {
        if (resource.hasOwnProperty(key)) {
          object.pagination[key] = resource[key];
        }
      }
      var delay = object.hasOwnProperty("delay") && !isNaN(object.delay) ? object.delay : 10;
      setTimeout(function () {
        object.loading = false;
      }, delay);
    },
    dateFormatSaveMoney(date, time = false) {
      var d = new Date(date);
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      let year = d.getFullYear();
      let hour = d.getHours();
      let minute = d.getMinutes();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      if (hour.toString().length < 2) hour = "0" + hour;
      if (minute.toString().length < 2) minute = "0" + minute;

      if (time) {
        return `${year}-${month}-${day}T${hour}:${minute}`;
      }
      return `${year}-${month}-${day}`;
    },
    dateFormatCurrent(time = false) {
      var d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minute = d.getMinutes();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      if (hour.toString().length < 2) hour = "0" + hour;
      if (minute.toString().length < 2) minute = "0" + minute;

      if (time) {
        return `${year}-${month}-${day}T${hour}:${minute}`;
      }
      return `${year}-${month}-${day}`;
    },
    removeAllSpecialCharacter(value) {
      return value.toString().replace(/[^\d.-]+/g, "");
    },
    formatCurrency(value, local = "đ") {
      var tempValue = value.toString().replace(/[^\d.-]+/g, "");
      while (tempValue.charAt(0) === "0") {
        tempValue = tempValue.substring(1);
      }
      var flagNegative = false;
      if (tempValue.toString()[0] == "-") {
        flagNegative = true;
      }
      tempValue = tempValue.replace("-", "");
      if (flagNegative) {
        tempValue = tempValue.replace("-", "");
        tempValue = "-" + tempValue;
      }
      if (tempValue) {
        return tempValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      }
      return 0;
    },
    formatNumber(value) {
      if (value) return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      return 0;
    },
  },
};

export default VueCommon;
