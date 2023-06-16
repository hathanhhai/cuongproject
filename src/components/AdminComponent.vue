<template lang="">
  <div class="ma-0 pa-2 mt-15">
    <v-row class="mx-auto">
      <v-col class="mx-auto" cols="12" lg="10">
        <v-card>
          <v-card-title>
            <p class="mb-5">Danh sách câu hỏi</p>
            <v-row>
              <v-col cols="12" lg="2"> <v-text-field v-model="limit" label="Số Lượng"></v-text-field></v-col>
              <v-col cols="12" lg="10"> <v-text-field v-model="keyword" label="Tìm kiếm"></v-text-field></v-col>
            </v-row>
          </v-card-title>
          <v-table hover>
            <thead>
              <tr>
                <th class="text-center">ID</th>
                <th class="text-center">Câu hỏi</th>
                <th class="text-center">Trả lời</th>
                <th class="text-center">Ghi chú</th>
                <th class="text-center">Ngày tạo</th>
                <th class="text-center"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in questions.data" :key="item.id">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.question }}</td>
                <td class="text-center">{{ item.answer }}</td>
                <td class="text-center">{{ item.note }}</td>
                <td class="text-center">{{ item.createdAt }}</td>
                <td class="">
                  <v-btn @click="deleteQuestion(item.id)" class="ma-1" color="error" icon="mdi-delete" size="small"></v-btn>
                  <v-dialog v-model="showForm" transition="dialog-bottom-transition" persistent width="1200">
                    <template v-slot:activator="{ props }">
                      <v-btn @click="edit(item)" v-bind="props" color="info" icon="mdi-pencil" class="ma-1" size="small"></v-btn>
                    </template>
                    <template v-slot:default="{ isActive }">
                      <v-card>
                        <v-form @submit.prevent="submit(item)">
                          <v-toolbar color="default" :title="`Sửa câu hỏi: ${item.question}`">
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
                                :error-messages="
                                  v$.formQuestion.answer.required.$invalid && v$.formQuestion.answer.$dirty ? 'Đáp án không được để trống' : ''
                                "
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

                            <v-btn color="primary" :variant="'outlined'" type="submit" class="float-right">
                              <v-icon>mdi mdi-pencil</v-icon>
                            </v-btn>
                          </v-card-actions>
                        </v-form>
                      </v-card>
                    </template>
                  </v-dialog>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-pagination
            v-if="questions.pagination.last_page > 1"
            v-model="page"
            :length="questions.pagination.last_page"
            rounded="circle"
          ></v-pagination>
        </v-card>
      </v-col>
    </v-row>
  </div>
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
import VueCommon from "@/utils/vueCommon";
import { useToast } from "vue-toastification";
export default {
  name: "AdminComponent",
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
      keyword: "",
      query: "",
      results: [],
      keyword: "",
      page: 1,
      limit: "",
      questions: {
        data: [],
        pagination: {
          current_page: 1,
          total: 0,
          per_page: 10,
          last_page: 1,
        },
      },
      formQuestion: {
        answer: "",
        id: "",
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

  mounted() {
    this.loadQuestions();
  },
  methods: {
    async edit(item) {
      this.formQuestion.question = item.question;
      this.formQuestion.answer = item.answer;
      this.formQuestion.note = item.note;
      this.formQuestion.id = item.id;
    },
    async submit() {
      const isFormCorrect = await this.v$.formQuestion.$validate();
      if (!isFormCorrect) {
        return;
      }
      var update = await questionService.update(this.formQuestion);
      if(update.data.success){
        this.loadQuestions();
      }
      this.showForm = false;

      // var questionUpdate = await
    },
    async deleteQuestion(id) {
      var deleteQuestion = await questionService.delete(id);
      if (deleteQuestion.data.success) {
        this.page = 1;
        this.keyword = "";
        this.loadQuestions();
        this.toast$.success("Xóa Thành Công");
      } else {
        this.toast$.error(deleteQuestion.data.message);
      }
    },
    async loadQuestions() {
      var questions = await questionService.getAll({ page: this.page, keyword: this.keyword, limit: this.limit });
      if (questions.data.success) {
        VueCommon.methods.mappingResponse(questions.data.questions, this.questions);
      }
    },
  },
  watch: {
    page: function (new_value, old_value) {
      this.loadQuestions();
    },
    keyword: function (new_value, old_value) {
      this.loadQuestions();
    },
    limit: function (new_value, old_value) {
      this.loadQuestions();
    },
  },
};
</script>
<style lang=""></style>
