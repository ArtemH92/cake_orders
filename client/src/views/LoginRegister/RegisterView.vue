<script setup lang="ts">
import { reactive, computed } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

interface UserRegister {
  username: string
  password: string
  confirm: string
}

const formStateUser = reactive<UserRegister>({
  username: '',
  password: '',
  confirm: ''
})

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const disabled = computed(() => {
  return !(formStateUser.username && formStateUser.password)
})
</script>

<template>
  <a-card>
    <a-typography-title :level="2" class="text-center">Авторизация</a-typography-title>
    <a-form
      :model="formStateUser"
      name="login_form"
      class="login-form mt-8"
      labelAlign="left"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Имя пользователя"
        name="username"
        :rules="[{ required: true, message: 'Введите имя пользователя!' }]"
      >
        <a-input v-model:value="formStateUser.username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        label="Пароль"
        name="password"
        :rules="[{ required: true, message: 'Введите пароль!' }]"
      >
        <a-input-password v-model:value="formStateUser.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item
        label="Подтвердите"
        name="password"
        :rules="[{ required: true, message: 'Введите пароль!' }]"
      >
        <a-input-password v-model:value="formStateUser.confirm">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item class="flex justify-center">
        <a-button :disabled="disabled" type="primary" html-type="submit"> Зарегистрироваться </a-button>
      </a-form-item>
      <a-typography class="text-center"
        >Есть аккаунт? <router-link to="/Login">Войти</router-link></a-typography
      >
    </a-form>
  </a-card>
</template>
