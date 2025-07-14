<script lang="ts" setup>
import axios from "axios"
import {ref} from "vue";
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import {Search, X} from 'lucide-vue-next';
import {Select} from "@/components/ui/select";
import {useRouter} from "vue-router";
import {API} from "@/Router/Pages";
import {ErrorType, SuggestedBook} from "@/types/types";
import {useSearchParams} from "@/composable/useSearchParams";
import {useDebouncer} from "@/composable/useDebouncer";
import SearchPreview from "@/components/SearchPreview/SearchPreview.vue";
import {useSearch} from "@/composable/useSearch";
import {onClickOutside} from "@vueuse/core";


const authors = ref();
const genres = ref();
const publishers = ref();
const suggested = ref<SuggestedBook[] | ErrorType>([]);
const showSuggested = ref(false);
const router = useRouter();
const searchContainer = ref<HTMLElement | null>(null);

onClickOutside(searchContainer, () => {
  showSuggested.value = false
});

const selectedCriteria = ref({
  authorId: '0',
  genreId: '0',
  publisherId: '0',
  bookName: '',
  publicDate: '',
  page: '1',
});

async function getCriteria() {
  await axios.get(API.CRITERIA_API)
      .then((res) => {
        authors.value = res.data.authors;
        genres.value = res.data.genres;
        publishers.value = res.data.publishers;
      })
}

getCriteria();

const debouncedSuggested = useDebouncer(async () => {
  const queryParams = useSearchParams(selectedCriteria.value);
  if (selectedCriteria.value.bookName.length) {
    const books = await useSearch(queryParams);

    suggested.value = books.books ? books.books : books;
  }
});

async function search() {
  const queryParams = useSearchParams(selectedCriteria.value);

  await router.push(`/search?${queryParams}`);
}

</script>

<template>
  <section class="flex justify-between mb-3">
    <div class="criteria w-full combo min-w-[509px]">
      <div class="flex flex-col md:flex-row gap-2 align-content-stretch justify-between">
        <select v-model="selectedCriteria.authorId"
                class="border-solid border rounded-lg outline-none h-full w-full rounded-md border border-input bg-transparent px-4 py-4 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
          <option value="0">Выберите автора</option>
          <option v-for="author of authors" :value="author.id">
            {{ author.authorLastName }} {{ author.authorName }}
          </option>
        </select>
        <select
            v-model="selectedCriteria.genreId"
            class="border-solid border rounded-lg outline-none h-full w-full rounded-md border border-input bg-transparent px-4 py-4 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
          <option value="0">Выберите жанр</option>
          <option v-for="genre of genres" :value="genre.id">
            {{ genre.genre_name }}
          </option>
        </select>
        <select
            v-model="selectedCriteria.publisherId"
            class="border-solid border rounded-lg outline-none h-full w-full rounded-md border border-input bg-transparent px-3 py-4 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
          <option value="0">Выберите издателя</option>
          <option v-for="publisher of publishers" :value="publisher.id">
            {{ publisher.publisher_name }}
          </option>
        </select>

        <Input
            v-model="selectedCriteria.publicDate"
            type='number' class="min-w-[200px] h-full py-4"
            placeholder="Введите дату выпуска"
        />
        <Input
            type='hidden' value='1' name='page' class='criteriaSelect h-full py-3'
        />
      </div>
      <div ref="searchContainer" class="search mt-3 flex flex-col items-center relative">
        <div class="flex w-full items-center">
          <Input @input="debouncedSuggested" @focus="showSuggested = true"
                 v-model="selectedCriteria.bookName"
                 class="search-input py-4 h-full criteriaSelect"
                 placeholder="Введите название книги"/>
          <button v-if="selectedCriteria.bookName" @click="selectedCriteria.bookName = ''"
                  class="absolute bg-transparent rounded-full right-[45px]">
            <X class="opacity-50 hover:opacity-100 transition-all duration-200"/>
          </button>
          <button @click="search"
                  class="absolute bg-transparent rounded-full transition-all duration-200 opacity-50 hover:opacity-100 right-3">
            <Search class="color-black"/>
          </button>
        </div>
        <Transition
            enter-active-class="transition-opacity duration-100"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
          <div class="w-full absolute bg-[#ffffff] z-[999] top-12 transition-all border border-solid p-3 rounded-b-lg"
               v-if="selectedCriteria.bookName.length && suggested.length && showSuggested">
            <SearchPreview v-for="suggest in suggested"
                           :suggest="suggest.bookName" :id="suggest.id"/>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped/>
