<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { LayoutLogin, RulesRegister } from '@/lib/formConfig'
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { RegisterForm } from '@/models/models';
import type { RegisterUserFormState } from '@/models/types';

const formRef = ref<FormInstance>()
const router = useRouter()

const { register } = useAuthStore()

const handleFinish = (values: RegisterUserFormState) => {
  register({username: values.username, password: values.password}).then(() => router.push('/'))
}
const handleFinishFailed = (errors: any) => {
  console.log(errors)
}

const rules = computed(() => RulesRegister(RegisterForm.password));
</script>

<template>
  <a-card class="w-full max-w-[500px] sm:max-w-[375px] md:max-w-[500px]">
    <a-typography-title class="text-center !text-[clamp(2rem,0.8rem+2vw,2.5rem)]">
      Регистрация
    </a-typography-title>
    <a-form
      ref="formRef"
      name="login_form"
      autocomplete="off"
      class="mt-8"
      :model="RegisterForm"
      :rules="rules"
      v-bind="LayoutLogin"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item label="Имя пользователя" name="username">
        <a-input v-model:value="RegisterForm.username" type="text" />
      </a-form-item>

      <a-form-item label="Пароль" name="password">
        <a-input-password v-model:value="RegisterForm.password" />
      </a-form-item>

      <a-form-item label="Подтвердите пароль" name="confirmPassword">
        <a-input-password v-model:value="RegisterForm.confirmPassword"  />
      </a-form-item>

      <a-form-item class="flex justify-center">
        <a-button type="primary" html-type="submit">Зарегистрироваться</a-button>
      </a-form-item>

      <a-typography class="text-center">
        Уже есть аккаунт? <router-link to="/login">Войти</router-link>
      </a-typography>

    </a-form>
  </a-card>
</template>