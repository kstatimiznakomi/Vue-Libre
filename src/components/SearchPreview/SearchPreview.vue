<template>
  <RouterLink class="w-full" :to="`/book/${id}`">
    <div ref="dropdownRef" class="text-start relative p-2 hover:bg-[#e6e6e6] transition-all rounded-lg">{{
        suggest
      }}
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const {id, suggest} = defineProps<{
  id: number,
  suggest: string,
}>()
</script>
