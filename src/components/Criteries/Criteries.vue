<script lang="ts" setup>
import axios from "axios"
import {ref} from "vue";
import Input from "../ui/input/Input.vue";
import Button from "../ui/button/Button.vue";
import {Search} from 'lucide-vue-next';
import {Select,} from "../ui/select";
import {useRouter} from "vue-router";

var authors = ref();
var genres = ref();
var publishers = ref();
var isSearchButtonAvailable = ref(false);
const router = useRouter();

var selectedCriteria = ref({
  authorId: '0',
  genreId: '0',
  publisherId: '0',
  bookName: '',
  publicDate: '',
  page: '1',
});

async function getCriteria() {
  await axios.get(`http://localhost:${import.meta.env.VITE_NEST_BACKEND_PORT}${import.meta.env.VITE_NEST_BACKEND_API}/criteria`)
      .then((res) => {
        authors.value = res.data.authors;
        genres.value = res.data.genres;
        publishers.value = res.data.publishers;
      })
}

getCriteria();

async function setCriteria() {
  var urlParams = new URLSearchParams();
  Object.entries(selectedCriteria.value).forEach((criteria) => {
    if (criteria[1] !== '' && criteria[1] !== '0') urlParams.set(criteria[0], criteria[1]);
    else urlParams.delete(criteria[0]);
  });
  let queryParams = decodeURIComponent(urlParams.toString());

  // await axios.get(`http://localhost:${import.meta.env.VITE_NEST_BACKEND_PORT}${import.meta.env.VITE_NEST_BACKEND_API}/search?${queryParams}`);

  await router.push(`/search?${queryParams}`);
}

</script>

<template>
  <section class="flex justify-between mb-3">
    <div class="criteria w-full combo flex-wrap container ">
      <div id='criteria'
           class="flex align-content-stretch gap-2 justify-between">
        <select v-model="selectedCriteria.authorId"
                class="border-solid border rounded-lg outline-none h-full w-full rounded-md border border-input bg-transparent px-3 py-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
          <option value="0">Выберите автора</option>
          <option v-for="author of authors" :value="author.id">
            {{ author.authorLastName }} {{ author.authorName }}
          </option>
        </select>
        <select
            v-model="selectedCriteria.genreId"
            class="border-solid border rounded-lg outline-none h-full w-full rounded-md border border-input bg-transparent px-3 py-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
          <option value="0">Выберите жанр</option>
          <option v-for="genre of genres" :value="genre.id">
            {{ genre.genre_name }}
          </option>
        </select>
        <select
            v-model="selectedCriteria.publisherId"
            class="border-solid border rounded-lg outline-none h-full w-full rounded-md border border-input bg-transparent px-3 py-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
          <option value="0">Выберите издателя</option>
          <option v-for="publisher of publishers" :value="publisher.id">
            {{ publisher.publisher_name }}
          </option>
        </select>

        <Input
            v-model="selectedCriteria.publicDate"
            type='number' class="min-w-[200px] h-full py-3"
            placeholder="Введите дату выпуска"
        />
        <Input
            type='hidden' value='1' name='page' class='criteriaSelect h-full py-3'
        />
      </div>
      <div class="search mt-3 flex w-full justify-between items-center relative">
        <Input
            v-model="selectedCriteria.bookName"
            class="search-input criteriaSelect"
            placeholder="Введите название книги"/>
        <Button @click="setCriteria" class="absolute right-0">
          <Search/>
        </Button>
      </div>
    </div>
  </section>
</template>

<style scoped/>
