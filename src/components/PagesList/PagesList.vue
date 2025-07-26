<script setup lang="ts">
import {defineProps, ref, watchEffect} from "vue";
import {RouterLink, useRoute, useRouter} from "vue-router";
import {Ellipsis} from 'lucide-vue-next';
import FirstPage from "./FirstPage/FirstPage.vue";
import {useSearchParams} from "../../composable/useSearchParams";

const {startPage, page, maxPage, allPages} = defineProps<{
  startPage: Number,
  page: Number,
  maxPage: Number
  allPages: Number
}>();

const startPageRef = ref(startPage);
const pageRef = ref(page);
const lastPageRef = ref(maxPage);
const pages = ref([]);
const route = useRoute();
const router = useRouter();

function changePageQuery(page: number) {
  if (Object.keys(route.query).length)
    return `${route.path}?${useSearchParams({
      query: {
        ...route.query,
        page: page.toString(),
      },
    }.query)}`;
  return useSearchParams(route.query);
}

function changePageParams(page: number) {
  if (Object.keys(route.params).length)
    return {
      params: {
        ...route.params,
        page: page.toString(),
      },
    }.params.page;
  return useSearchParams(route.params);
}

watchEffect(async () => {
  pages.value = [];
  startPageRef.value = startPage;
  pageRef.value = page;
  lastPageRef.value = maxPage;

  for (let i = startPageRef.value; i <= lastPageRef.value; i++) {
    pages.value.push(i);
  }
}, [startPage, page, maxPage]);

</script>

<template>
  <div class="gap-2 my-6 min-w-[509px] flex items-center flex-wrap justify-center">
    <div class="flex gap-3">
      <FirstPage v-if="startPage > 1"/>
      <div class="flex" v-for="curPage of pages">
        <RouterLink
            :to="`${changePageParams(curPage)}${changePageQuery(curPage)}`"
            v-if="curPage !== page"
            class="p-3 bg-[#e3e3e3] rounded-lg">{{
            curPage
          }}
        </RouterLink>
        <span class="p-3 bg-[#bbbbbb] rounded-lg" v-else>
        {{ curPage }}
      </span>
      </div>
      <div class="flex gap-3" v-if="lastPageRef < allPages">
        <div class="h-full flex p-3 items-center justify-center">
          <Ellipsis/>
        </div>
        <RouterLink :to="`/catalog/${allPages}`"
                    class="p-3 bg-[#e3e3e3] rounded-lg">Последняя
        </RouterLink>
      </div>
    </div>
  </div>
</template>
