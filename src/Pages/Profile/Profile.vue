<template>
  <component
      :is="editMode ? EditProfile : ProfileInfo"
      :key="editMode"
      :user="userInfo"
      @changeMode="editMode ? modeChanged() : (editMode = true)"
  />
  <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
  >
    <Success v-if="success" :message="'Данные успешно изменены!'"/>
  </Transition>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import ProfileInfo from "./components/ProfileInfo.vue";
import EditProfile from "./components/EditProfile.vue";
import {useGetUser} from "../../composable/useGetUser";
import {useAuth} from "../../composable/useAuth";
import Success from '../../components/Success/Success.vue'
import {useToastStore} from "../../store/toast";

const {user} = useAuth();
const toast = useToastStore();

const success = ref(false);

const editMode = ref(false);
onMounted(async () => {
  userRaw.value = await useGetUser(user.value.id);
});

async function modeChanged() {
  editMode.value = false;
  toast.showToast('Профиль успешно обновлён!');
  userRaw.value = await useGetUser(user.value.id);
  setTimeout(() => {
    success.value = false;
  }, 2000);
}

const userRaw = ref();

const userInfo = computed(() =>
    userRaw.value
        ? Object.entries(userRaw.value).map(([key, value]) => ({key, value}))
        : {}
)
</script>
