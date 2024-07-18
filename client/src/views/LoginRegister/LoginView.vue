<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { RulesLogin, LayoutLogin } from './settings/config'

interface UserFormState {
  username: string
  password: string
}
const formRef = ref<FormInstance>()
const formState = reactive<UserFormState>({
  username: '',
  password: ''
})

const handleFinish = (values: UserFormState) => {
  console.log(values, formState, 'success')
}
const handleFinishFailed = (errors: any) => {
  console.log(errors)
}

const handleValidate = (...args: any) => {
  console.log(args)
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
      :model="formState"
      :rules="RulesLogin"
      v-bind="LayoutLogin"
      @finish="handleFinish"
      @validate="handleValidate"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item label="Имя пользователя" name="username">
        <a-input v-model:value="formState.username" type="text" />
      </a-form-item>
      <a-form-item label="Пароль" name="password">
        <a-input-password v-model:value="formState.password" />
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
