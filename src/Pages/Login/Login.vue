<template>
  <UserForm>
    <Form
        class="flex flex-col max-w-[800px] w-full border border-solid p-7 rounded-lg"
        @submit="loginFn">
      <div class="mb-3">
        <span class="text-2xl">Вход в аккаунт</span>
      </div>
      <div class="gap-3 flex flex-col h-full">
        <Input v-model.trim="values.username" autocomplete
               required class="w-full p-5 h-full"
               placeholder="Введите имя пользователя"/>
        <FormError v-for="e in errors.username"
                   :key="e.errorCode"
                   :errorMessage="e.message"/>
        <Input v-model.trim="values.password" autocomplete
               type="password" required
               class="w-full h-full p-5"
               placeholder="Введите пароль"/>
        <FormError v-for="e in errors.password"
                   :key="e.errorCode"
                   :errorMessage="e.message"/>
        <Input v-model.trim="values.verifyPassword" autocomplete
               type="password"
               required
               class="w-full h-full p-5"
               placeholder="Введите подтверждение пароля"/>
        <FormError v-for="e in errors.verifyPassword"
                   :key="e.errorCode"
                   :errorMessage="e.message"/>
        <Button class="w-full text-2lg">Войти</Button>
      </div>
    </Form>
  </UserForm>
</template>

<script setup lang="ts">
import Input from "../../components/ui/input/Input.vue";
import {Form} from "vee-validate";
import Button from "../../components/ui/button/Button.vue";
import {loginUserSchema} from "@/ZodSchemas/ZodSchemas";
import {useZodValidator} from 'vue-use-zod-validator'
import FormError from "../../components/Form/FormError/FormError.vue";
import UserForm from "@/components/Form/UserForm.vue";
import {UserLogin} from "@/types/types.ts";
import {useRouter} from "vue-router";
import {useAuth} from "@/composable/useAuth";

const router = useRouter();

const {login} = useAuth();

const {
  values,
  errors,
  validate,
} = useZodValidator<UserLogin>(loginUserSchema, {
  username: '',
  password: '',
  verifyPassword: '',
});

async function loginFn() {
  const result = await validate();
  if (result.isValid) {
    try {
      await login(values.value);
      await router.replace('/');
    } catch (e) {
      console.log(e);
    }
  } else console.log(errors.value);
}
</script>
