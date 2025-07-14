<template>
  <div class="w-full mt-3 flex justify-center">
    <div class="shadow-xl max-w-[500px] w-full rounded-lg">
      <p class="text-2xl font-bold">Профиль</p>
      <div v-for="item in user">
        <UserInfoItem :itemName="item.value.field" :item="item.value.value"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {jwtDecode} from "jwt-decode";
import {useCookies} from "vue3-cookies";
import {useGetUser} from "@/composable/useGetUser";
import UserInfoItem from "@/components/UserInfoItem/UserInfoItem.vue";
import {computed, onMounted, ref} from "vue";

const {cookies} = useCookies();
const payload = jwtDecode(cookies.get('accessToken'));

onMounted(async () => {
  userRaw.value = await useGetUser(payload.id);
})

const userRaw = ref();

const user = computed(() =>
    userRaw.value
        ? Object.entries(userRaw.value).map(([key, value]) => ({key, value}))
        : []
)
</script>
