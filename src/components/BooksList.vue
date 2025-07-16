<script setup lang="ts">
import BookComp from '@/components/Book/BookComp.vue';
import {defineAsyncComponent, defineProps} from "vue";
import {useFavouriteBooks} from "@/composable/useFavouriteBooks";
import {Books, ErrorBookResponse, FavouriteBook} from "../types/types";
import {useAuth} from "../composable/useAuth";

const {result} = defineProps<{
  result: Books | ErrorBookResponse,
}>();

const {user, isSigned} = useAuth();
const favouriteBooks: FavouriteBook[] = isSigned ? await useFavouriteBooks(user.value.id) : [];

const PagesList = defineAsyncComponent({
  loader: () => import('@/components/PagesList/PagesList.vue'),
  delay: 200,
})
</script>

<template>
  <div v-if="result.response">
    <span>{{ result.response }}</span>
  </div>
  <div v-if="result.books" class="grid transition-all">
    <ul class="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full transition-all">
      <BookComp v-bind:key="book.id" v-for="book in result.books" :book-name="book.bookName"
                :count="book.count"
                :id="book.id"
                :img="book.poster" :description="book.description" :favouriteBooks="favouriteBooks"/>
    </ul>
    <PagesList v-if="!result.error || result.books.length" :maxPage="result.lastPage" :allPages="result.allPages"
               :startPage="result.startPage"
               :page="result.page"/>
  </div>
</template>
