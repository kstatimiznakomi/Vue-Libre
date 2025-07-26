<script lang="ts" setup>

import './book.module.scss';
import {defineProps, ref} from "vue";
import NotAvailable from "./NotAvailable.vue";
import OpenButton from "@/components/OpenButton/OpenButton.vue";
import BookInfo from "./BookInfo.vue";
import ToOrderBtn from "./ToOrderBtn.vue";
import {HeartMinus, HeartPlus} from 'lucide-vue-next';
import Button from "../../ui/button/Button.vue";
import axios from "axios";
import {API} from "@/Router/Pages";
import {FavouriteBook} from "@/types/types";
import {useAddedFavourite} from "@/composable/useAddedFavourite";
import {useRouter} from "vue-router";
import {useAuth} from "@/composable/useAuth";
import {useDebouncer} from "../../../composable/useDebouncer";
import {useToastStore} from "../../../store/toast";

const {user, isSigned} = useAuth();
const router = useRouter();
const toast = useToastStore();

const {id, bookName, description, img, count, favouriteBooks} = defineProps<{
  id: Number,
  bookName: String,
  count: Number,
  img: String,
  description: String,
  favouriteBooks: FavouriteBook[],
}>();

function favourite() {
  if (isSigned.value) {
    toast.showToast(`${addedToFavourite.value
        ? 'Книга убрана из избранного'
        : 'Книга добавлена в избранное'}`);
    addedToFavourite.value = !addedToFavourite.value;
    debouncedFavourite();
  } else router.push('/login');
}

const visibleInfo = ref(false);
const showBtn = ref(false);

const addedToFavourite = ref(isSigned.value ? !!useAddedFavourite(id, favouriteBooks.books) : false);

const debouncedFavourite = useDebouncer(async () => {
  axios.get(`${API.FAVOURITE_API}/${id}`, {
    withCredentials: true,
  });
});
</script>

<template>
  <li @mouseenter="showBtn = true" @mouseleave="showBtn = false"
      class="book grid grid-cols-[250px_1fr] items-center min-w-[509px] p-3 bg-[#ecd582] rounded-lg transition-all">
    <div class="relative">
      <div
          class="favourite absolute flex items-center justify-center left-[15px] top-[15px] bg-white p-2 rounded-full cursor-pointer
                              ">
        <button :title="!addedToFavourite ? 'Добавить в избранное' : 'Убрать из избранного'" @click="favourite">
          <HeartPlus v-if="!addedToFavourite" class="stroke-black"/>
          <HeartMinus v-if="addedToFavourite" class="stroke-black"/>
        </button>
      </div>
      <img class='book-img' alt='название' :src="img"/>
    </div>
    <div class='w-full h-full sm:flex grid flex-col transition-all'>
      <div class="w-full flex relative justify-end transition-all">
        <OpenButton title="Открыть подробности" @click="visibleInfo = !visibleInfo" v-show="showBtn"/>
      </div>
      <div class="w-full h-full justify-center transition-all duration-200 flex items-center">
        <RouterLink :to="`/book/${id}`" class='text-3xl transition-all duration-200 font-bold text-center'>{{
            bookName
          }}
        </RouterLink>
      </div>
      <div class="sm:flex self-center w-full justify-center" v-if="!count">
        <NotAvailable :message="'Книги нет в наличии'"/>
      </div>
      <div class="sm:flex self-center w-full justify-center" v-if="!isSigned">
        <NotAvailable :message="'Войдите чтобы заказать книгу'"/>
      </div>
      <div>
        <ToOrderBtn v-if="count && isSigned" :book-id="id"/>
        <div>
          <span v-if="count" class="text-l noselect">Количество: {{ count }}</span>
        </div>
      </div>
    </div>
  </li>
  <Teleport to="#app">
    <BookInfo v-if="visibleInfo" @close="visibleInfo = false" :img="img"
              :description="description"
              :bookName="bookName"/>
  </Teleport>
</template>

<style scoped>
@import "@/components/BooksList/Book/book.module.scss";
@import "@/assets/biblio.scss";
</style>
