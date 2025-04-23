<script lang="ts" setup>
import {defineProps} from "vue";

defineProps<{
  bookName: String,
  img: String,
  description: String
}>();
</script>

<template>
  <div>
    <div class='cover-content fixed z-10 transition-all align-items-center justify-content-center'>
      <div class="book-info d-flex transition-all">
        <div>
          <img height=240 alt='название' :src="img"/>
        </div>
        <div class='ml-3'>
          <h3>{{ bookName }}</h3>
          <h3>Описание: {{ description }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "Book.module.scss";
</style>