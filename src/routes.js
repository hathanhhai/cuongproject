
import { createRouter, createWebHistory } from "vue-router";
import { useToast } from "vue-toastification";
import i18n from "@/langs/i18n";
import AdminPage from "@/pages/AdminPage";
import HomePage from "@/pages/HomePage";
import { ROUTER_CUONG, ROUTER_HOME } from "./useConfig";

export const routes = [
  {
    path: `/`,
    name: ROUTER_HOME,
    component: HomePage,
    meta: { titleI18n: "Trang chủ" },
  },
  {
    path: `/cuong`,
    name: 'admin',
    component: AdminPage,
    meta: { titleI18n: "Đăng nhập" },
  },

  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const DEFAULT_TITLE = "Trang chủ";

router.beforeEach((to, from, next) => {
 

  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = DEFAULT_TITLE;
  }

  next();
});

export { router };
