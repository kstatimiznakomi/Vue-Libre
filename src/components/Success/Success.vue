<template>
  <div class="absolute bg-success font-bold rounded-sm p-4 right-2 transition-all bottom-2">
    <span class="select-none">
    {{ message }}
    </span>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const {message} = defineProps<{
  success: boolean,
  message: string
}>()
</script>

<style scoped>

</style>