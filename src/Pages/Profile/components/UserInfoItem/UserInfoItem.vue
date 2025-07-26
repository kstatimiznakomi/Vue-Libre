<template>
  <div
      class="flex min-w-[276px] hover:bg-low-gray items-center gap-2 transition-opacity duration-500 justify-between p-5">
    <span class="sm:text-xl w-full text-start">{{ itemName }}</span>
    <slot/>
  </div>
  <hr>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const {itemName} = defineProps<{
  itemName: String,
  item?: String,
}>();
</script>

