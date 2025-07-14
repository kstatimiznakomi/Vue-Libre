<template>
  <Criteries/>
  <CriteriaList v-if="route.path.includes('/search')"/>
  <Suspense>
    <BooksList :error="error" :books="books" :startPage="startPage" :curPage="curPage" :allPages="allPages"
               :lastPage="lastPage"/>
    <template #fallback>
      <Loader/>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import BooksList from "@/components/BooksList.vue";
import Criteries from "@/components/Criteries/Criteries.vue";
import {ref, watchEffect} from "vue";
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
import {currentPage} from "@/constants/constants";
import CriteriaList from "@/components/Criteries/CriteriaList/CriteriaList.vue";
import Loader from "../../components/Loader/Loader.vue";
import {API} from "../../Router/Pages";

const route = useRoute();
const lastPage = ref();
const startPage = ref();
const allPages = ref();
const books = ref([]);
const error = ref();
const router = useRouter();

const curPage = ref(currentPage);

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
            curPage.value = res.data.page;
            lastPage.value = res.data.lastPage;
            startPage.value = res.data.startPage;
            books.value = res.data.books;
            allPages.value = res.data.allPages;
          } else router.push(`/catalog/${res.data.allPages}`);
        })
  }
}

async function getSearch() {
  error.value = '';
  await axios.get(`${API.BASE_API}${route.fullPath}`)
      .then((res) => {
        if (res.data.status || !res.data) {
          error.value = res.data.response;
          books.value = [];
        } else {
          curPage.value = res.data.page;
          lastPage.value = res.data.lastPage;
          startPage.value = res.data.startPage;
          books.value = res.data.books;
          allPages.value = res.data.allPages;
        }
      })
}
</script>
