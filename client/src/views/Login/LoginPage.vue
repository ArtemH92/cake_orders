<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { LayoutLogin, RulesLogin } from '@/lib/formConfig'
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const userData = reactive({
  username: '',
  password: ''
})

const router = useRouter()

const formRef = ref()

const { login } = useAuthStore()

const handleFinish = (values) => {
  login(values).then(() => router.push('/'))
}

const handleFinishFailed = (errors) => {
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
      :model="userData"
      :rules="RulesLogin"
      v-bind="LayoutLogin"
      @finish="handleFinish(userData)"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item label="Имя пользователя" name="username">
        <a-input v-model:value="userData.username" type="text" />
      </a-form-item>
      <a-form-item label="Пароль" name="password">
        <a-input-password v-model:value="userData.password" />
      </a-form-item>
      <a-form-item class="flex justify-center">
        <a-button type="primary" html-type="submit">Войти</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>