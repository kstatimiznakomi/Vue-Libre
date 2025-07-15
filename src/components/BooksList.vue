<script setup lang="ts">
import BookComp from '@/components/Book/BookComp.vue';
import {defineAsyncComponent, defineProps} from "vue";
import {useFavouriteBooks} from "@/composable/useFavouriteBooks";
import {FavouriteBook} from "../types/types";
import {useAuth} from "../composable/useAuth";

const {error, books, lastPage, startPage, curPage, allPages} = defineProps<{
  books: [],
  lastPage: Number,
  startPage: Number,
  curPage: Number,
  error?: String,
  allPages: Number
}>();

const {user, isSigned} = useAuth();
const favouriteBooks: FavouriteBook[] = isSigned ? await useFavouriteBooks(user.value.id) : [];

const PagesList = defineAsyncComponent({
  loader: () => import('@/components/PagesList/PagesList.vue'),
  delay: 200,
})
</script>

<template>
  <div v-if="error">
    <span>{{ error }}</span>
  </div>
  <div v-if="books" class="grid transition-all">
    <ul class="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full transition-all">
      <BookComp v-bind:key="book.id" v-for="book in books" :book-name="book.bookName"
                :count="book.count"
                :id="book.id"
                :img="book.poster" :description="book.description" :favouriteBooks="favouriteBooks"/>
    </ul>
    <PagesList v-if="!error || books.length" :maxPage="lastPage" :allPages="allPages" :startPage="startPage"
               :page="curPage"/>
  </div>
</template>


<style scoped>

</style>