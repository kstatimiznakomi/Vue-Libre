<script setup>
import HeaderComp from "@/components/Header/HeaderComp.vue";</script>

<template>
  <HeaderComp/>
  <div class="flex justify-center">
    <div class="container max-w-[1223px]">
      <RouterView/>
    </div>
  </div>
</template>

<style>

</style>
