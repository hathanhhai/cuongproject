<template lang="">
  <div v data-v-71b42fb1="" class="transaction-empty">
    <div data-v-71b42fb1="" class="moneylover-empty">
      <span data-v-71b42fb1="" class="smile all " :class="loading ? 'rotating' : ''">^_^</span> <span data-v-71b42fb1="" class="note"></span>
      <span data-v-71b42fb1="" class="tips"
        ><span data-v-71b42fb1="" class="note" v-if="!loading">Đang tải...</span></span
      >
    </div>
  </div>
</template>
<script>
export default {
  props:{loading:Boolean},
  name: "ElementEmpty",
};
</script>
<style lang=""></style>
