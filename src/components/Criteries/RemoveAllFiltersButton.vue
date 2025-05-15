<template>
  <button @click="removeAllFilters" class="rounded-full border border-solid px-4 py-2">
    Очистить фильтры
  </button>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

async function removeAllFilters() {
  const urlParams = new URLSearchParams(route.fullPath.split('?')[1]);
  for (var i of [...urlParams.keys()]) {
    if (i !== 'page') urlParams.delete(i);
  }
  let queryParams = decodeURIComponent(urlParams.toString());
  await router.push(`/search?${queryParams}`);
}
</script>
