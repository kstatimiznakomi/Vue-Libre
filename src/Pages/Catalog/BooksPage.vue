<template>
  <Criteries/>
  <CriteriaList v-if="route.path.includes('/search')"/>
  <Suspense>
    <BooksList v-if="result" :result="result"/>
    <template #fallback>
      <Loader/>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import BooksList from "@/components/BooksList/BooksList.vue";
import Criteries from "@/components/Criteries/Criteries.vue";
import {ref, watchEffect} from "vue";
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
import CriteriaList from "@/components/Criteries/CriteriaList/CriteriaList.vue";
import Loader from "../../components/Loader/Loader.vue";
import {API} from "../../Router/Pages";
import {Books, ErrorBookResponse} from "../../types/types";

const route = useRoute();
const result = ref<Books | ErrorBookResponse>();
const router = useRouter();

watchEffect(() => {
  if (route.path.includes('/catalog')) {
    getCatalog(route.params.page);
  }
  if (route.path.includes('/search')) {
    getSearch();
  }
}, route.path);


async function getCatalog(page) {
  if (Number(page) < 1) await router.push(`/catalog/${Math.max(1, Number(route.params.page))}`)
  else {
    await axios.get(`${API.CATALOG_API}/${Math.max(1, Number(route.params.page))}`)
        .then((res) => {
          if (route.params.page <= res.data.allPages) {
            result.value = res.data;
          } else router.push(`/catalog/${result.value.allPages}`);
        })
  }
}

async function getSearch() {
  await axios.get(`${API.BASE_API}${route.fullPath}`)
      .then((res) => {
        if (res.data.status || !res.data) {
          result.value = res.data;
        } else {
          result.value = res.data;
        }
      })
}
</script>
