<template>
  <div class="flex justify-center">
    <Form
        class="flex flex-col max-w-[800px] w-full border border-solid p-6 rounded-lg"
        @submit="login">
      <div class="mb-3">
        <span class="text-2xl">Вход в аккаунт</span>
      </div>
      <div class="gap-3 flex flex-col h-full">
        <Input v-model.trim="values.username" autocomplete="" v-model="form.username"
               required class="w-full p-3 h-full"
               placeholder="Введите имя пользователя"/>
        <FormError v-for="e in errors.username"
                   :key="e.errorCode"
                   :errorMessage="errors.username[0].message"/>
        <Input v-model.trim="values.password" autocomplete="" v-model="form.password"
               type="password" required
               class="w-full h-full p-3"
               placeholder="Введите пароль"/>
        <FormError v-for="e in errors.password"
                   :key="e.errorCode"
                   :errorMessage="errors.password[0].message"/>
        <Input v-model.trim="values.verifyPassword" autocomplete=""
               v-model="form.verifyPassword" type="password"
               required
               class="w-full h-full p-3"
               placeholder="Введите подтверждение пароля"/>
        <FormError v-for="e in errors.verifyPassword"
                   :key="e.errorCode"
                   :errorMessage="errors.verifyPassword[0].message"/>
        <Button class="w-full text-2lg">Войти</Button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import Input from "../ui/input/Input.vue";
import {Form} from "vee-validate";
import Button from "../ui/button/Button.vue";
import {ref} from "vue";
import {loginUserSchema} from "../../ZodSchemas/ZodSchemas";
import {useZodValidator} from 'vue-use-zod-validator'
import axios from "axios";
import FormError from "../FormError/FormError.vue";

type UserLogin = {
  username: '',
  password: '',
  verifyPassword: '',
}

const form = ref<UserLogin>({
  username: '',
  password: '',
  verifyPassword: '',
})

const {
  values,
  errors,
  validate,
} = useZodValidator<UserLogin>(loginUserSchema, {
  username: '',
  password: '',
  verifyPassword: '',
})

async function login() {
  const result = await validate();
  if (result.isValid) {
    await axios.post(
        `http://localhost:${import.meta.env.VITE_NEST_BACKEND_PORT}${import.meta.env.VITE_NEST_BACKEND_API}/auth`,
        values.value, {
          withCredentials: true,
          
        }
    ).then((res) => {
      console.log(res);
    }).catch((e) => {
      console.log(e);
    });
  } else console.log(errors.value);
}
</script>
