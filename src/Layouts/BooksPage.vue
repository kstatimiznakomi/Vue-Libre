<template>
  <Criteries/>
  <CriteriaList v-if="route.path.includes('/search')"/>
  <BooksList :error="error" :books="books" :startPage="startPage" :curPage="curPage" :lastPage="lastPage"/>
</template>

<script setup lang="ts">
import BooksList from "../components/BooksList.vue";
import Criteries from "../components/Criteries/Criteries.vue";
import {ref, watchEffect} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import {currentPage} from "../constants/constants";
import CriteriaList from "../components/Criteries/CriteriaList/CriteriaList.vue";

const route = useRoute();
const lastPage = ref();
const startPage = ref();
const books = ref([]);
const error = ref();

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
  await axios.get(`http://localhost:${import.meta.env.VITE_NEST_BACKEND_PORT}${import.meta.env.VITE_NEST_BACKEND_API}/catalog/${page}`)
      .then((res) => {
        curPage.value = res.data.page;
        lastPage.value = res.data.lastPage;
        startPage.value = res.data.startPage;
        books.value = res.data.books;
      })
}

async function getSearch() {
  error.value = '';
  await axios.get(`http://localhost:${import.meta.env.VITE_NEST_BACKEND_PORT}${import.meta.env.VITE_NEST_BACKEND_API}${route.fullPath}`)
      .then((res) => {
        if (res.data.status || !res.data) {
          error.value = res.data.response;
          books.value = [];
        } else {
          curPage.value = res.data.page;
          lastPage.value = res.data.lastPage;
          startPage.value = res.data.startPage;
          books.value = res.data.books;
        }
      })
}
</script>
