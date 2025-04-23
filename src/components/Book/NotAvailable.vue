<script lang="ts" setup>
import {defineProps} from "vue";

const {message} = defineProps<{
  message: String,
}>();
</script>

<template>
  <div class="not__available noselect">
    <span class="transition-all">{{ message }}</span>
  </div>
</template>

<style scoped/>