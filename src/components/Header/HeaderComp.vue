<script lang="ts" setup>
import './Header.module.scss';
import {useRouter} from "vue-router";
import Button from "../ui/button/Button.vue";
import {LogIn, LogOut} from 'lucide-vue-next';
import {useAuth} from "@/composable/useAuth";

const router = useRouter();

const {user, isSigned, logout} = useAuth();

function logoutFun() {
  logout();

  router.push('/');
}
</script>

<template>
  <section class="sticky">
    <header class="bg-[#FFE68B] py-4 mb-3 justify-center flex">
      <div
          class='container lg:flex grid grid-cols-1 md:justify-center md:flex-row min-w-[509px] flex-wrap gap-2 mx-2'>
        <div class="flex">
          <img class='rounded-full' src="https://i.postimg.cc/9FpWWbkr/rd-lib.png" height=40 width=40
               alt="logo"/>
        </div>
        <div class="flex md:text-center">
          <RouterLink to="/" class='link w-full transition-all'>Главная</RouterLink>
        </div>
        <div class="flex md:text-center">
          <RouterLink to="/catalog/1" class='link w-full transition-all'>Каталог</RouterLink>
        </div>
        <div class="flex md:text-center">
          <RouterLink to="/about" class='link w-full transition-all'>О нас</RouterLink>
        </div>
        <div class="grid lg:flex gap-2 md:text-center" v-if="!isSigned">
          <div class="flex md:text-center">
            <RouterLink to="/login" class='link w-full transition-all'>
              <LogIn/>
            </RouterLink>
          </div>
          <div class="flex md:text-center">
            <RouterLink to="/register" class='link w-full transition-all'>Зарегистрироваться</RouterLink>
          </div>
        </div>
        <div class="flex justify-between md:text-center gap-2" v-if="isSigned">
          <div class="flex max-w-80">
            <RouterLink to="/profile" class="link self-center justify-end">{{ user.username }}</RouterLink>
          </div>
          <div class="flex max-w-80">
            <RouterLink to="/favourite?page=1" class="link self-center justify-end">Избранное</RouterLink>
          </div>
          <div class="flex md:text-center">
            <button @click="logoutFun" class='link w-full transition-all duration-200'>
              <LogOut/>
            </button>
          </div>
        </div>
      </div>
    </header>
  </section>
</template>

<style scoped>
@import "Header.module.scss";
</style>
