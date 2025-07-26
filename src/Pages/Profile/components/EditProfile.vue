<template>
  <ProfileWrapper :title="'Редактирование пользователя'" :width="500">
    <template #edit>
      <CloseButton title="Отменить редактирование" @click="emit('changeMode')"/>
    </template>
    <template #content>
      <Form @submit="patchFn">
        <div v-for="item in user" :key="item.value.field">
          <UserInfoItem :itemName="item.value.field">
            <div class="flex flex-col w-full">
              <Input class="h-full py-4"
                     v-model.trim="values[fieldMap[item.value.field]]"
                     required
                     :placeholder="item.value.field"/>
              <FormError v-for="e in errors[fieldMap[item.value.field]]"
                         :key="e.errorCode"
                         :errorMessage="e.message"/>
            </div>
          </UserInfoItem>
        </div>
        <Button :disabled="!isChangedValues || hasErrors" class="w-full">Сохранить</Button>
      </Form>
    </template>
  </ProfileWrapper>
</template>

<script setup lang="ts">
import UserInfoItem from "@/Pages/Profile/components/UserInfoItem/UserInfoItem.vue";
import {Form} from "vee-validate";
import {computed, defineEmits, defineProps} from "vue";
import {useZodValidator} from "vue-use-zod-validator";
import CloseButton from "../../../components/CloseButton/CloseButton.vue";
import FormError from "../../../components/Form/FormError/FormError.vue";
import Button from "../../../components/ui/button/Button.vue";
import Input from "../../../components/ui/input/Input.vue";
import {useAuth} from "../../../composable/useAuth";
import {fieldMap, User} from "../../../types/types";
import {patchUserSchema} from "../../../ZodSchemas/ZodSchemas";
import ProfileWrapper from "./ProfileWrapper.vue";

const getField = (field: string): string => {
  return [...user].find((item) => item.value.field === field)?.value.value ?? '';
}

const {
  values,
  errors,
  validate,
} = useZodValidator<Omit<User, 'password' | 'verifyPassword'>>(patchUserSchema, {
  lastname: getField('Фамилия'),
  firstname: getField('Имя'),
  surname: getField('Отчество'),
  username: getField('Имя пользователя'),
  phone: getField('Телефон'),
  email: getField('Почта')
});

const {user} = defineProps<{
  user: User
}>();

const baseFieldsState = {
  lastname: getField('Фамилия'),
  firstname: getField('Имя'),
  surname: getField('Отчество'),
  username: getField('Имя пользователя'),
  phone: getField('Телефон'),
  email: getField('Почта')
};

const isChangedValues = computed(() => {
  return JSON.stringify(values.value) !== JSON.stringify(baseFieldsState);
});

const hasErrors = computed(() => {
  return Object.keys(errors.value).length;
});

const {patch} = useAuth();

async function patchFn() {
  const result = await validate();
  if (result.isValid) {
    try {
      await patch(values.value);
      emit('changeMode');
    } catch (e) {
      console.log(e);
    }
  } else console.log(errors.value);
}

const emit = defineEmits(['changeMode', 'success']);
</script>
