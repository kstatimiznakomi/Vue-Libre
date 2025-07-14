<template>
  <div>
    <span class="bg-[#e8d17d] px-5 py-3 rounded-full select-none items-center flex gap-1">{{ criteria[1] }}
      <button @click="removeFilter"
              class="rounded-full transition-colors duration-100 hover:bg-[#baa868] cursor-pointer">
        <X class="p-1" title="Убрать фильтр"/>
      </button>
      </span>
  </div>
</template>

<script setup lang="ts">
import {X} from 'lucide-vue-next';
import {defineProps} from "vue";
import {useRoute, useRouter} from "vue-router";

const {criteria} = defineProps<{
  criteria: [],
}>()

const router = useRouter();
const route = useRoute();

async function removeFilter() {
  const urlParams = new URLSearchParams(route.fullPath.split('?')[1]);
  urlParams.delete(criteria[0]);
  let queryParams = decodeURIComponent(urlParams.toString());
  await router.push(`/search?${queryParams}`);
}
</script>
