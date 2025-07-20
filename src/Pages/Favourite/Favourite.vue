<template>
  <Suspense>
    <BooksList v-if="favouriteBooks" :result="favouriteBooks"/>
    <template #fallback>
      <Loader/>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import {useAuth} from "@/composable/useAuth";
import {ref, watchEffect} from "vue";
import {useFavouriteBooks} from "@/composable/useFavouriteBooks";
import BooksList from "@/components/BooksList.vue";
import Loader from "@/components/Loader/Loader.vue";
import {Books, ErrorBookResponse} from "../../types/types";
import {useRoute} from "vue-router";
import {useSearchParams} from "../../composable/useSearchParams";

const {user} = useAuth();
const favouriteBooks = ref<Books | ErrorBookResponse>();
const route = useRoute();

watchEffect(async () => {
  const searchParams = useSearchParams(route.query);
  console.log(searchParams);

  favouriteBooks.value = await useFavouriteBooks(user.value.id, searchParams);
}, route.query)

</script>
