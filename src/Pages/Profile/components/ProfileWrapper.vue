<template>
  <div class="w-full mt-3 flex justify-center">
    <div :class="`max-w-[${width}]`" class="shadow-xl container w-full rounded-lg absolute mb-2">
      <div class="relative right-0 top-0 p-2 items-center justify-center flex gap-2">
        <p class="text-2xl font-bold">{{ title }}</p>
        <slot name="edit"/>
      </div>
      <slot name="content"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const {title, width} = defineProps<{ title: string, width: number }>();
import {defineProps} from "vue";</script>