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
import {onMounted, ref, watchEffect} from "vue";
import {useFavouriteBooks} from "@/composable/useFavouriteBooks";
import BooksList from "@/components/BooksList.vue";
import Loader from "@/components/Loader/Loader.vue";
import {Books, ErrorBookResponse} from "../../types/types";
import {useRoute} from "vue-router";

const {user} = useAuth();
const favouriteBooks = ref<Books | ErrorBookResponse>();
const route = useRoute();

watchEffect(async () => {
  console.log(11111);
  favouriteBooks.value = await useFavouriteBooks(user.value.id);
}, route.params.page)

onMounted(async () => {
  favouriteBooks.value = await useFavouriteBooks(user.value.id);
})
</script>
