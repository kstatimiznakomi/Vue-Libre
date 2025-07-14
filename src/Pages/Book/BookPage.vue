<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="flex mb-2 p-2">
      <button @click="router.back()">
        <MoveLeft class="opacity-50 hover:opacity-100 transition-all duration-200"/>
      </button>
    </div>
    <div class="flex flex-col h-[394px] sm:flex-row gap-6">
      <img
          :src="book.poster"
          alt="Обложка книги"
          class="w-[300px] object-cover rounded shadow-md"
      />

      <div class="flex flex-col justify-between h-full text-start">
        <div>
          <h1 class="text-3xl font-bold mb-2">{{ book.bookName }}</h1>
          <p class="text-lg text-gray-500 mb-1">Автор: <span class="font-medium">{{ book.authors }}</span></p>
          <p class="text-lg text-gray-500 mb-1">Жанр: <span class="font-medium">{{ book.genres }}</span></p>
          <p class="text-lg text-gray-500 mb-1">Издатель: <span class="font-medium">{{ book.publisher }}</span></p>

          <p class="text-lg text-gray-500 mb-1">Описание:</p>
          <div class="mx-2">

            <span v-for="n in 10" class="text-gray-800 text-lg whitespace-pre-line">{{ book.description }}</span>
          </div>
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-4">Дата публикации: {{ book.publicDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {MoveLeft} from 'lucide-vue-next';
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import {API} from "../../Router/Pages";

const book = ref({
  id: 0,
  bookName: '',
  authors: '',
  genres: '',
  publisher: '',
  publicDate: 0,
  description: '',
  poster: '',
});

onMounted(async () => {
  book.value = await getBook();
});

const route = useRoute();
const router = useRouter();

async function getBook() {
  const response = await axios.get(`${API.BOOK_API}/${route.params.id}`);
  return response.data;
}
</script>
