<script setup lang="ts">

import {defineProps} from "vue";

const {bookId} = defineProps<{
  bookId: String,
}>();

function click() {
  console.log(bookId);
}
</script>

<template>
  <button @click="click" class="to_order transition-all noselect font-bold text-xl">Заказать</button>
</template>

<style scoped/>