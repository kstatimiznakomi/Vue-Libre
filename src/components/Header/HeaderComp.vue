<script lang="ts" setup>
import './Header.module.scss';</script>

<template>
  <section class="head sticky">
    <header class="header sticky">
      <div class='flex justify-center items-center flex-wrap gap-2 container'>
        <img class='rounded-full' src="https://i.postimg.cc/9FpWWbkr/rd-lib.png" height=40 width=40
             alt="logo"/>
        <div class="flex flex-wrap gap-2">
          <RouterLink to="/" class='link transition-all'>Главная</RouterLink>
          <RouterLink to="/catalog/1" class='link transition-all'>Каталог</RouterLink>
          <RouterLink to="/about" class='link transition-all'>О нас</RouterLink>
        </div>
        <div class='flex flex-wrap gap-2'>
          <RouterLink to="/profile" class='link transition-all'>Профиль</RouterLink>
          <RouterLink to="/login" class='link transition-all'>Войти</RouterLink>
          <RouterLink to="/register" class='link transition-all'>Зарегистрироваться</RouterLink>
          <RouterLink to="/logout" class='link transition-all'>Выйти</RouterLink>
        </div>
      </div>

    </header>
  </section>
</template>

<style scoped>
@import "Header.module.scss";
</style>
