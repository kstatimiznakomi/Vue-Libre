<template>
  <div class="flex min-w-[276px] justify-between p-5">
    <span class="sm:text-xl">{{ itemName }}</span>
    <span class="sm:text-xl">{{ item }}</span>
  </div>
  <hr>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const {itemName, item} = defineProps<{
  itemName: String,
  item: String,
}>();
</script>

<style scoped>

</style>