<template lang="">
  <div class="ma-0 pa-2 mt-15">
    <v-app>
      <v-main>
        <v-container class="mt-20">
          <v-card class="mx-auto my-16 pa-4" max-width="420">
            <Lang :text="true" class="text-right"></Lang>
            <v-card-title class="text-center py-10 text-uppercase">Đăng Nhập </v-card-title>

            <v-card-text>
              <v-form @submit.prevent="submit()">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      name="username"
                      v-model="v$.username.$model"
                      required
                      :error-messages="v$.username.required.$invalid && v$.username.$dirty ? 'Bạn chưa nhập tên đăng nhập' : ''"
                      @input="v$.username.$touch()"
                      @blur="v$.username.$touch()"
                      label="Tên đăng nhập"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      name="password"
                      v-model="v$.password.$model"
                      required
                      :error-messages="v$.password.required.$invalid && v$.password.$dirty ? 'Bạn chưa nhập mật khẩu' : ''"
                      @input="v$.password.$touch()"
                      @blur="v$.password.$touch()"
                      label="Mật khẩu"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12 px-3 pb-5 pt-5 py-0">
                    <p class="text-caption pb-3 text-red text-center" v-if="message">{{ message }}</p>
                    <VBtn :disabled="v$.$invalid" block type="submit">
                      <v-progress-circular :width="2" :size="25" v-if="loadingButtonSubmit" indeterminate color="saveRed"></v-progress-circular
                      ><span v-else>{{ $t("login") }}</span>
                    </VBtn>

                    <VBtn style="display:none" @click="trigger()" block color="cyan" class="mt-5 mb-5">
                      <span class="text-white"> Tạo mới</span>
                    </VBtn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import { useConfigStore } from "@/stores/configStore";
import { useTheme } from "vuetify/lib/framework.mjs";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import questionService from "@/services/question.service";
import { useQuestionStore } from "@/stores/questionStore";
import _ from "lodash";
import { toHandlers } from "vue";
import { useToast } from "vue-toastification";
import { encryptStorage } from "@/utils/encryptLocalStorage";
export default {
  name: "LoginComponent",
  components: {},
  setup: () => ({
    configStore$: useConfigStore(),
    questionStore$: useQuestionStore(),
    theme$: useTheme(),
    v$: useVuelidate(),
    toast$: useToast(),
  }),

  data() {
    return {
      showForm: false,
      username: "",
      password: "",
      loadingButtonSubmit: false,
      errorLogin: "",
      isPasswordVisible: false,
      message: "",
      keyword: "",
      query: "",
      results: [],
      formQuestion: {
        answer: "",
        question: "",
        categoryId: "",
        note: "",
      },
    };
  },
  validations() {
    return {
      username: {
        required,
      },

      password: {
        required,
      },
    };
  },

  mounted() {
  },
  methods: {
    async trigger() {
      var trigger = await questionService.trigger();
      this.toast$.success("Đã tạo mới");
    },
    async submit() {
      this.message = "";
      this.errorLogin = "";
      this.loadingButtonSubmit = true;
      this.$Progress.start();
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        this.$Progress.fail();
        this.loadingButtonSubmit = false;
        return;
      }
      var login = await questionService.login(this.username, this.password);
      this.$Progress.finish();
      if (login.data.success) {
        encryptStorage.setItem("user", {
          isLogined: true,
          user: login.data.user,
        });
        this.questionStore$.setIslogined(true);
        this.questionStore$.setUser(login.data.user);
      } else {
        this.message = "Sai thông tin tài khoản";
      }
      console.log(this.username);
      console.log(this.password);
      this.loadingButtonSubmit = false;
    },
  },
  watch: {},
};
</script>
<style lang=""></style>
