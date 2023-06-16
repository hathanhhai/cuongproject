<template lang="">
  <v-app-bar density="compact" height="60" class="pt-1 pb-1">
    <template v-slot:prepend>
      <v-btn class="" @click="changeTheme()" color="default" icon>
        <v-icon>{{ configStore$.theme == "light" ? "mdi-weather-night" : "mdi-weather-sunny" }}</v-icon>
      </v-btn>
    </template>
    <v-app-bar-title>
      <v-text-field v-if="$route.name == 'home'" class="mt-2 pb-1" label="Tìm kiếm" v-model="keyword" variant="underlined"></v-text-field>
    </v-app-bar-title>
    <template v-slot:append>
      <v-dialog v-model="showForm" transition="dialog-bottom-transition" persistent width="1200">
        <template v-slot:activator="{ props }">
          <v-btn v-if="$route.name == 'home'" v-bind="props" class="ml-4" color="success" variant="text">Thêm</v-btn>
          <v-btn @click="logout()" v-if="$route.name == 'admin' && questionStore$.isLogined" class="ml-4" color="red" variant="text"
            ><v-icon>mdi mdi-logout</v-icon></v-btn
          >
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-form @submit.prevent="submit()">
              <v-toolbar color="default" title="Thêm câu hỏi">
                <v-btn @click="isActive.value = false" color="secondary" variant="text">X</v-btn>
              </v-toolbar>
              <v-card-text>
                <v-col cols="12">
                  <v-text-field
                    name="question"
                    v-model="v$.formQuestion.question.$model"
                    :error-messages="
                      v$.formQuestion.question.required.$invalid && v$.formQuestion.question.$dirty ? 'Câu hỏi không được để trống' : ''
                    "
                    @input="v$.formQuestion.question.$touch()"
                    @blur="v$.formQuestion.question.$touch()"
                    block
                    clearable
                    :label="'Câu hỏi' + '*'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    name="answer"
                    v-model="v$.formQuestion.answer.$model"
                    :error-messages="v$.formQuestion.answer.required.$invalid && v$.formQuestion.answer.$dirty ? 'Đáp án không được để trống' : ''"
                    @input="v$.formQuestion.answer.$touch()"
                    @blur="v$.formQuestion.answer.$touch()"
                    block
                    clearable
                    :label="'Đáp án' + '*'"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea v-model="formQuestion.note" name="note" label="Ghi chú"></v-textarea>
                </v-col>
              </v-card-text>
              <v-card-actions>
                <v-btn class="float-left" color="secondary" variant="text" @click="isActive.value = false">X</v-btn>
                <v-spacer></v-spacer>

                <v-btn color="success" :variant="'outlined'" type="submit" class="float-right">
                  <v-icon>mdi mdi-plus</v-icon>
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </template>
      </v-dialog>
    </template>
  </v-app-bar>
</template>
<script>
import { useConfigStore } from "@/stores/configStore";
import { useTheme } from "vuetify/lib/framework.mjs";
import { DEFAULT_LANG, LANG_EN } from "@/useConfig";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import questionService from "@/services/question.service";
import { useQuestionStore } from "@/stores/questionStore";
import _ from "lodash";
import { encryptStorage } from "@/utils/encryptLocalStorage";
export default {
  name: "PublicNavbar",
  components: {},
  setup: () => ({
    configStore$: useConfigStore(),
    questionStore$: useQuestionStore(),
    theme$: useTheme(),
    v$: useVuelidate(),
  }),

  data() {
    return {
      showForm: false,
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
      formQuestion: {
        question: {
          required,
        },
        answer: {
          required,
        },
      },
    };
  },

  mounted() {},
  methods: {
    logout() {
      this.questionStore$.setIslogined(false);
      this.questionStore$.setUser(null);
      encryptStorage.removeItem("user");
    },
    async search() {
      this.questionStore$.setKeyword(this.keyword);
      this.questionStore$.setPage(1);
      this.questionStore$.load();
      //  var temp =  _.debounce(function () {
      //   }, 1000);
      //   temp();
    },
    async submit() {
      // this.$emit("loadQuestion");
      const isFormCorrect = await this.v$.formQuestion.$validate();

      if (!isFormCorrect) {
        return;
      }
      var save = await questionService.save(this.formQuestion);
      if (save.data.success) {
        this.showForm = false;
        this.questionStore$.setCreateId(save.data.question.id);
        this.questionStore$.load();
      }
    },
    changeTheme() {
      if (this.configStore$.theme == "light") {
        this.configStore$.setTheme("dark");
      } else {
        this.configStore$.setTheme("light");
      }
      this.theme$.global.name.value = this.configStore$.theme;
    },
    changeLang() {
      if (this.configStore$.lang == DEFAULT_LANG) {
        this.configStore$.setLang(LANG_EN);
      } else {
        this.configStore$.setLang(DEFAULT_LANG);
      }
    },
  },
  watch: {
    keyword: function (new_value, old_value) {
      this.search();
    },
    showForm: function (new_value, old_value) {
      if (new_value) {
        this.questionStore$.setCreateId(null);
      }
    },
  },
};
</script>
<style lang=""></style>
