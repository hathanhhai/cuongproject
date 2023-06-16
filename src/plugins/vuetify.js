// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import theme from "./theme";
import defaults from "./defaults";
// Vuetify
import { createVuetify } from "vuetify";
import { VDataTable } from 'vuetify/labs/VDataTable'
export default createVuetify({ theme, defaults,components:{VDataTable} });
