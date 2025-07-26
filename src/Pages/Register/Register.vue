<template>
  <UserForm>
    <Form
        class="flex flex-col max-w-[800px] w-full border border-solid p-7 rounded-lg"
        @submit="register">
      <div class="mb-3">
        <span class="text-2xl">Регистрация</span>
      </div>
      <div class="gap-3 flex flex-col h-full">
        <FormError v-if="registerError" class="justify-center" :key="registerError.statusCode"
                   :errorMessage="registerError.message"/>
        <Input v-model.trim="values.lastname" autocomplete="" v-model="form.lastname"
               required class="w-full p-5 h-full"
               placeholder="Введите фамилию"/>
        <FormError v-for="e in errors.lastname"
                   :key="e.errorCode"
                   :errorMessage="errors.lastname[0].message"/>
        <Input v-model.trim="values.firstname" autocomplete="" v-model="form.firstname"
               required class="w-full p-5 h-full"
               placeholder="Введите имя"/>
        <FormError v-for="e in errors.firstname"
                   :key="e.errorCode"
                   :errorMessage="errors.firstname[0].message"/>
        <Input v-model.trim="values.surname" autocomplete="" v-model="form.surname"
               required class="w-full p-5 h-full"
               placeholder="Введите отчество"/>
        <FormError v-for="e in errors.surname"
                   :key="e.errorCode"
                   :errorMessage="errors.surname[0].message"/>
        <Input v-model.trim="values.email" type="email" autocomplete="" v-model="form.email"
               required class="w-full p-5 h-full"
               placeholder="Введите почту"/>
        <FormError v-for="e in errors.email"
                   :key="e.errorCode"
                   :errorMessage="errors.email[0].message"/>
        <Input type="tel" v-model.trim="values.phone" autocomplete="" v-model="form.phone"
               required class="w-full p-5 h-full"
               placeholder="Введите номер телефона"/>
        <FormError v-for="e in errors.phone"
                   :key="e.errorCode"
                   :errorMessage="errors.phone[0].message"/>
        <Input v-model.trim="values.username" autocomplete="" v-model="form.username"
               required class="w-full p-5 h-full"
               placeholder="Введите имя пользователя"/>
        <FormError v-for="e in errors.username"
                   :key="e.errorCode"
                   :errorMessage="errors.username[0].message"/>
        <Input v-model.trim="values.password" autocomplete="" v-model="form.password"
               type="password" required
               class="w-full h-full p-5"
               placeholder="Введите пароль"/>
        <FormError v-for="e in errors.password"
                   :key="e.errorCode"
                   :errorMessage="errors.password[0].message"/>
        <Input v-model.trim="values.verifyPassword" autocomplete=""
               v-model="form.verifyPassword" type="password"
               required
               class="w-full h-full p-5"
               placeholder="Введите подтверждение пароля"/>
        <FormError v-for="e in errors.verifyPassword"
                   :key="e.errorCode"
                   :errorMessage="errors.verifyPassword[0].message"/>
        <Button class="w-full text-2lg">Зарегистрироваться</Button>
      </div>
    </Form>
  </UserForm>
</template>

<script setup lang="ts">
import UserForm from "@/components/Form/UserForm.vue";
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import FormError from "@/components/Form/FormError/FormError.vue";
import {Form} from "vee-validate";
import {useZodValidator} from "vue-use-zod-validator";
import {registerUserSchema} from "@/ZodSchemas/ZodSchemas.ts";
import {User} from "@/types/types.ts";
import axios from "axios";
import {API} from "@/Router/Pages";
import {ref} from "vue";

const form = ref<User>({
  username: '',
  password: '',
  verifyPassword: '',
});

const registerError = ref({});

const {
  values,
  errors,
  validate,
} = useZodValidator<User>(registerUserSchema, {
  firstname: '',
  lastname: '',
  surname: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  verifyPassword: '',
});

async function register() {
  const result = await validate();
  if (result.isValid) {
    try {
      const res = await axios.post(
          API.REGISTER_API,
          values.value, {
            withCredentials: true,
          }
      ).then((res) => {
        console.log(res);
      })
          .catch((e) => {
            registerError.value = e.response.data;
            console.log(registerError.value.value);
          });
    } catch (e) {
      console.log(e);
    }
  } else console.log(errors.value);
}
</script>
