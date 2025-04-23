<template>
  <p class="flex flex-start text-[#e60000] p-2 mt-0"
  >{{ errorMessage }}</p>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

defineProps<{
  errorMessage: String
}>();
</script>
