<template>
  <ProfileWrapper :title="'Профиль'" :width="200">
    <template #edit>
      <button title="Редактировать" @click="emit('changeMode')" class="rounded-full">
        <Pencil class="opacity-25 hover:opacity-50 transition-opacity"/>
      </button>
    </template>
    <template #content>
      <div v-for="item in user">
        <UserInfoItem :itemName="item.value.field" :item="item.value.value">
          <span class="sm:text-xl">{{ item.value.value }}</span>
        </UserInfoItem>
      </div>
    </template>
  </ProfileWrapper>
</template>

<script setup lang="ts">

import {User} from "../../../types/types";
import {defineEmits, defineProps} from "vue";
import UserInfoItem from "@/Pages/Profile/components/UserInfoItem/UserInfoItem.vue";
import {Pencil} from 'lucide-vue-next';
import ProfileWrapper from "./ProfileWrapper.vue";

const emit = defineEmits(['changeMode']);

const {user} = defineProps<{
  user: User
}>();</script>
