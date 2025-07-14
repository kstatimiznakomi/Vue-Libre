<template>
  <Suspense>
    <BooksList :error="error" :books="favouriteBooks.books" :startPage="favouriteBooks.startPage"
               :curPage="favouriteBooks.page"
               :allPages="favouriteBooks.allPages"
               :lastPage="favouriteBooks.lastPage"/>
    <template #fallback>
      <Loader/>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import {useAuth} from "@/composable/useAuth";
import {onMounted, ref} from "vue";
import {Books} from "@/types/types";
import {useFavouriteBooks} from "@/composable/useFavouriteBooks";
import BooksList from "@/components/BooksList.vue";
import Loader from "@/components/Loader/Loader.vue";
import {useRoute} from "vue-router";
import {useSearchParams} from "../../composable/useSearchParams";

const {user} = useAuth();
const favouriteBooks = ref<Books>([]);
const error = ref();
const route = useRoute();

onMounted(async () => {
  const queryParams = useSearchParams(route.query);
  favouriteBooks.value = await useFavouriteBooks(user.value.id, queryParams);
})
</script>
