<script lang="ts" setup>
import { ref } from 'vue'
import { LoginForm } from '@/models/models';
import type { LoginUserFormState } from '@/models/types';
import type { FormInstance } from 'ant-design-vue'
import { RulesLogin, LayoutLogin } from '@/lib/formConfig'
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter()

const formRef = ref<FormInstance>()

const { login } = useAuthStore()

const handleFinish = (values: LoginUserFormState) => {
  login(values).then(() => router.push('/'))
}

const handleFinishFailed = (errors: any) => {
  console.log(errors)
}

</script>

<template>
  <a-card class="w-full max-w-[500px] sm:max-w-[375px] md:max-w-[500px]">
    <a-typography-title class="text-center !text-[clamp(2rem,0.8rem+2vw,2.5rem)]">
      Авторизация
    </a-typography-title>
    <a-form
      ref="formRef"
      name="login_form"
      autocomplete="off"
      class="mt-8"
      :model="LoginForm"
      :rules="RulesLogin"
      v-bind="LayoutLogin"
      @finish="handleFinish(LoginForm)"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item label="Имя пользователя" name="username">
        <a-input v-model:value="LoginForm.username" type="text" />
      </a-form-item>
      <a-form-item label="Пароль" name="password">
        <a-input-password v-model:value="LoginForm.password" />
      </a-form-item>
      <a-form-item class="flex justify-center">
        <a-button type="primary" html-type="submit">Войти</a-button>
      </a-form-item>
      <a-typography class="text-center">
        Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link>
      </a-typography>
    </a-form>
  </a-card>
</template>
