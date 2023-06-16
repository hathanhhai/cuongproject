<template>
  <PublicUI>
    <div v-if="loading">
      <LoginComponent v-if="!questionStore$.isLogined"></LoginComponent>
      <AdminComponent v-else></AdminComponent>
    </div>
  </PublicUI>
</template>
<script>
import ElementEmpty from "@/components/layouts/ElementEmpty.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import AdminComponent from "@/components/AdminComponent.vue";
import PublicUI from "@/components/layouts/PublicUI.vue";
import { useQuestionStore } from "@/stores/questionStore";
import { encryptStorage } from "@/utils/encryptLocalStorage";
import questionService from "@/services/question.service";

export default {
  name: "HomePage",
  setup: () => ({
    questionStore$: useQuestionStore(),
  }),
  components: {
    PublicUI,
    ElementEmpty,
    LoginComponent,
    AdminComponent,
  },
  data() {
    return {
      page: 1,
      isLogin: false,
      loading: false,
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    async checkLogin() {
      this.loading = false;
      if (encryptStorage.getItem("user")) {
        var userLocal = encryptStorage.getItem("user");
        var login = await questionService.login(userLocal.user.username, userLocal.user.password);
        if (login.data.success) {
          this.loading =true;
          this.questionStore$.setIslogined(true);
          this.questionStore$.setUser(login.data.user);
          this.isLogin = true;
        } else {
          encryptStorage.removeItem("user");
          this.questionStore$.setIslogined(false);
          this.isLogin = false;
          this.loading =true;
          this.questionStore$.setUser(null);
        }
      } else {
        encryptStorage.removeItem("user");
        this.isLogin = false;
        this.loading =true;
        this.questionStore$.setIslogined(false);
        this.questionStore$.setUser(null);
      }
    },
  },
  watch: {
    'questionStore$.isLogined':function(new_value){
      if(new_value){
        this.loading = true;
      }
    }
  },
};
</script>
<style lang=""></style>
