<script lang="ts" setup>
import {defineEmits, defineProps} from "vue";
import {cn} from '@/lib/utils';
import {X} from 'lucide-vue-next';
import Button from "../ui/button/Button.vue";

const emit = defineEmits(['close']);

defineProps<{
  bookName: String,
  img: String,
  description: String,
}>();

</script>

<template>
  <Transition
      enter-active-class="transition-transform duration-300"
      enter-from-class="scale-75 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition-transform duration-200"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-75 opacity-0"
  >
    <div @click.self="emit('close')"
         :class="cn('fixed no-scrollbar transition-all duration-200 bg-gray-900 flex z-10 transition-all top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[100%] max-h-full')">
      <div class="relative p-4 w-full max-w-2xl max-h-full transition-all">
        <div class="relative flex bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div class="p-4">
            <img width="2000" alt='название' :src="img"/>
          </div>
          <div class='ml-3 justify-start flex flex-col '>
            <div class="flex justify-end">
              <button @click="emit('close')"
                      class="p-2 cursor-pointer rounded-full">
                <X class="opacity-50 hover:opacity-100 transition-all duration-200"/>
              </button>

            </div>
            <div class="flex">
              <h3 class="text-2xl text-black">{{ bookName }}</h3>
            </div>
            <div class="flex justify-start w-full">
              <p class="text-2xl text-black">Описание:</p>
            </div>
            <div class="flex justify-start">
              <h3 class="text-2xl text-black">
                <span v-for="n in 10">{{ description }}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
@import "Book.module.scss";
</style>