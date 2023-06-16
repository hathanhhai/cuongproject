<template>
  <PublicUI>
    <div class="ma-0 pa-2 mt-15">
      <v-row>
        <v-col cols="12">
          <v-pagination v-if="questionStore$.questions.pagination.last_page > 1" v-model="page" class="my-4" :length="questionStore$.questions.pagination.last_page"></v-pagination>
        </v-col>
        <v-col v-if="!this.loading" cols="12" lg="3" class=" " v-for="item in questionStore$.questions.data" :key="item.id">
          <v-dialog transition="dialog-bottom-transition" width="1300">
            <template v-slot:activator="{ props }">
              <v-hover>
                <template v-slot:default="{ isHovering, hover }">
                  <v-card
                    :color="questionStore$.createId == item.id ? 'green-accent-1' : ''"
                    v-bind="(hover, props)"
                    class="hover-pointer"
                    :elevation="isHovering ? 6 : undefined"
                  >
                    <template v-slot:text>
                      <span class="text-subtitle-1" style="cursor: text" :class="questionStore$.createId == item.id ? ' text-black' : 'text-teal'">
                        {{ item.question }}
                      </span></template
                    >
                    <v-card-text class="d-flex align-stretch">
                      <span class="text-cyan-accent-4" style="cursor: text">
                        {{ item.answer.length > 47 ? item.answer.substring(1, 47) + "..." : item.answer }}</span
                      >
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      {{ item.createdAt }}
                      <v-spacer></v-spacer>
                      <v-icon color="primary" v-if="item.note && item.note != 0">mdi mdi-text</v-icon>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-hover>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card>
                <v-toolbar color="cyan">
                  <span class="text-white text-h5 font-italic pa-5">{{ item.question }}</span>
                </v-toolbar>
                <v-card-text>
                  <div class="text-h5 pa-2">{{ item.answer }}</div>
                  <v-divider v-if="item.note && item.note != 0"></v-divider>
                  <p v-if="item.note && item.note != 0" class="text-start mt-5">
                    {{ item.note }}
                  </p>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn variant="text" @click="isActive.value = false">Đóng</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
        <v-col v-else cols="12">
          <ElementEmpty loading="true"></ElementEmpty>
        </v-col>
      </v-row>
    </div>
  </PublicUI>
</template>
<script>
import ElementEmpty from "@/components/layouts/ElementEmpty.vue";
import PublicUI from "@/components/layouts/PublicUI.vue";
import { useQuestionStore } from "@/stores/questionStore";
import { load } from "webfontloader";

export default {
  name: "HomePage",
  setup: () => ({
    questionStore$: useQuestionStore(),
  }),
  components: {
    PublicUI,
    ElementEmpty,
  },
  data(){
    return {
      page:1
    }
  },
  mounted() {
    this.getQuestions();
  },
  methods: {
    async getQuestions() {
      var questions = await this.questionStore$.load();
    },
  },
  watch:{
    page:function(new_value,old_value){
      this.questionStore$.setPage(new_value);
      this.questionStore$.load(new_value,'');
    }
  }
};
</script>
<style lang=""></style>
