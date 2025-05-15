<script lang="ts" setup>

import './book.module.scss';
import {defineProps, ref} from "vue";
import NotAvailable from "./NotAvailable.vue";
import ToOrderBtn from "./ToOrderBtn.vue";
import {Heart} from 'lucide-vue-next';

const visibleInfo = ref(false);

function favourite(id) {
  console.log(id);
}

defineProps<{
  id: Number,
  bookName: String,
  count: Number,
  img: String,
  description: String
}>();
</script>

<template>
  <li @click="visibleInfo = !visibleInfo"
      class="self-center book items-center max-h-[342px] p-3 bg-[#ecd582] min-w-[501px] rounded-lg transition-all">
    <div class="items-center justify-center flex w-full">
      <div class="w-full relative">
        <div @click="favourite(id)"
             class="favourite absolute flex items-center justify-center left-[15px] top-[15px] bg-white p-2 rounded-full cursor-pointer
                              ">
          <Heart class="stroke-black"/>
        </div>
        <img class='book-img' alt='название' :src="img"/>
      </div>
      <div class='ml-2 w-full h-full flex flex-col'>
        <div class="w-full h-full justify-center flex items-center">
          <span class='text-3xl font-bold text-center'>{{ bookName }}</span>
        </div>
        <div class="flex justify-center" v-if="count === 0">
          <NotAvailable :message="'Книги нет в наличии'"/>
        </div>
        <div v-else>
          <ToOrderBtn :book-id="id"/>
          <div>
            <span class="text-l noselect">Количество: {{ count }}</span>
          </div>
        </div>
      </div>
    </div>
  </li>

</template>

<style scoped>
@import "Book.module.scss";
@import "@/assets/biblio.scss";
</style>
