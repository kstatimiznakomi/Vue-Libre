<template>
  <Header/>
  <main class="flex justify-center">
    <div class="container max-w-[1223px] mx-3">
      <RouterView/>
    </div>
  </main>
</template>

<script setup>
import Header from '@/components/Header/HeaderComp.vue';</script>
