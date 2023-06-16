import { defineStore } from "pinia";
import { router } from "@/routes";
import questionService from "@/services/question.service";
import common from "@/utils/vueCommon";
const nameStore = "question";
export const useQuestionStore = defineStore(nameStore, {
  state: () => ({
    loading: false,
    createId: "",
    currentPage: 1,
    isLogined: false,
    user: false,
    keyword: "",
    questions: {
      data: [],
      pagination: {
        current_page: 1,
        total: 0,
        per_page: 10,
        last_page: 1,
      },
    },
    questionSelected: "",
  }),

  actions: {
    async load() {
      this.loading = true;
      var questions = await questionService.getAll({ page: this.currentPage, keyword: this.keyword });
      if (questions.data.success) {
        common.methods.mappingResponse(questions.data.questions, this.questions);
        this.loading = false;
        return true;
      }
      this.loading = false;
      return false;
    },
    setQuestionSelected(question) {
      this.questionSelected = question;
    },
    setPage(page) {
      this.currentPage = page;
    },
    setKeyword(value) {
      this.keyword = value;
    },
    setIslogined(value) {
      this.isLogined = value;
    },
    setUser(value) {
      this.user = value;
    },
    setCreateId(id) {
      this.createId = id;
    },
    setLoading(value) {
      this.loading = value;
    },
  },
});
