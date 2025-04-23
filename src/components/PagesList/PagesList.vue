<script setup lang="ts">
import {defineProps, ref, watchEffect} from "vue";
import {RouterLink} from "vue-router";

const {startPage, page, maxPage} = defineProps<{
  startPage: Number,
  page: Number,
  maxPage: Number
}>();

const startPageRef = ref(startPage);
const pageRef = ref(page);
const lastPageRef = ref(maxPage);
var pages = ref([]);

watchEffect(async () => {
  pages.value = [];
  startPageRef.value = startPage;
  pageRef.value = page;
  lastPageRef.value = maxPage;

  for (let i = startPageRef.value; i <= lastPageRef.value; i++) {
    pages.value.push(i);
  }
}, [startPage, page, maxPage])


</script>

<template>
  <div class="container mt-4 flex items-center flex-wrap justify-center">
    <div class="" v-for="curPage of pages">
      <RouterLink :to="`/catalog/${curPage}`" v-if="curPage !== page" class="p-3 bg-[#e3e3e3] rounded-lg ml-2">{{
          curPage
        }}
      </RouterLink>
      <span class="p-3 bg-[#bbbbbb] rounded-lg ml-2" v-else>
        {{ curPage }}
      </span>
    </div>
  </div>
</template>


<style scoped>

</style>