<template>
  <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
  >
    <div v-if="toast.visible" class="absolute bg-success font-bold rounded-sm p-4 right-2 transition-all bottom-2">
    <span class="select-none">
    {{ toast.message }}
    </span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {useToastStore} from "../../store/toast";

const toast = useToastStore();

</script>

<style scoped>

</style>