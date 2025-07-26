<template>
  <Transition
      enter-active-class="transition duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
  >
    <button v-if="showButton"
            title="Наверх"
            @click="scrollToTop"
            class="left-[50px] p-5 bottom-[50px] rounded-full z-[999] fixed left-0 hover:bg-[#ffffff] bg-transparent bg-[#d9d9d9] opacity-50 transition-opacity hover:opacity-100 duration-400">
      <ChevronUp/>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import {ChevronUp} from 'lucide-vue-next';
import {onMounted, onUnmounted, ref} from "vue";

const showButton = ref(false);

function handleScroll() {
  showButton.value = window.scrollY > 200;
}

function scrollToTop() {
  showButton.value = false;
  window.scrollTo({top: 0, behavior: 'smooth'});
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
