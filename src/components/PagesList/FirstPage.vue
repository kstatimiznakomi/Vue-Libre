<template>
  <div class="flex gap-3">
    <RouterLink :to="`/catalog/1`" class="p-3 bg-[#e3e3e3] rounded-lg">Первая</RouterLink>
    <div class="h-full flex p-3 items-center justify-center">
      <Ellipsis/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Ellipsis} from 'lucide-vue-next';</script>

<style scoped>

</style>