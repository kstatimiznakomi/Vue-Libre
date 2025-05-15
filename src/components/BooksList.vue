<script setup lang="ts">
import BookComp from '../components/Book/BookComp.vue';
import {defineAsyncComponent, defineProps} from "vue";

const {error, books, lastPage, startPage, curPage} = defineProps<{
  books: [],
  lastPage: Number,
  startPage: Number,
  curPage: Number,
  error?: String,
}>()

const PagesList = defineAsyncComponent({
  loader: () => import('../components/PagesList/PagesList.vue'),
  delay: 200,
})
</script>

<template>
  <div v-if="error">
    <span>{{ error }}</span>
  </div>
  <div v-if="books">
    <div class=" ">
      <ul class="grid grid-cols-4 gap-4 auto-fill w-full transition-all">
        <BookComp v-bind:key="book.id" v-for="book in books" :book-name="book.bookName"
                  :count="book.count"
                  :id="book.id"
                  :img="book.img" :description="book.description"/>
      </ul>
    </div>
    <PagesList v-if="!error || books" :maxPage="lastPage" :startPage="startPage" :page="curPage"/>
  </div>
</template>


<style scoped>
.auto-fill {
  grid-template-columns: repeat(auto-fill, 501px);
}
</style>