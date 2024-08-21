<script lang="ts" setup>
import { reactive, computed, ref } from 'vue'
import { FormLayout, RulesRegister } from '@/lib/formConfig'
import { useAuthStore } from '@/stores/auth';
import { CreateUser, SendUser } from '@/models/users/user.module';
import { message } from 'ant-design-vue';
import { vMaska } from 'maska'

const formRef = ref()
const userData = reactive(new CreateUser)
const emit = defineEmits(['closeModal'])

const { register } = useAuthStore()

const handleFinish = (values) => {
  register(new SendUser(values)).then(() => {
    message.success('Пользователь успешно создан')
    emit('closeModal')
  })
}
const handleFinishFailed = (errors) => {
  console.log(errors)
}

const rules = computed(() => RulesRegister(userData.password));
</script>


<template>
  <a-card class="w-full max-w-[500px] sm:max-w-[375px] md:max-w-[500px]">
    <a-typography-title class="text-center !text-[clamp(2rem,0.8rem+2vw,2.5rem)]">
      Регистрация нового пользователя
    </a-typography-title>
    <a-form
      ref="formRef"
      name="login_form"
      autocomplete="off"
      class="mt-8"
      :model="userData"
      :rules="rules"
      v-bind="FormLayout"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item label="Имя пользователя" name="username">
        <a-input v-model:value="userData.username" type="text" />
      </a-form-item>

      <a-form-item label="Пароль" name="password">
        <a-input-password v-model:value="userData.password" />
      </a-form-item>

      <a-form-item label="Подтвердите пароль" name="confirmPassword">
        <a-input-password v-model:value="userData.confirmPassword"  />
      </a-form-item>

      <a-form-item label="Номер телефона" name="phone">
        <a-input v-model:value="userData.phone" type="text" v-maska data-maska="+375 (##) ### ## ##" />
      </a-form-item>

      <a-form-item label="Дать права администратора" name="administrator">
        <a-checkbox v-model:checked="userData.administrator"></a-checkbox>
      </a-form-item>

      <div class="flex justify-evenly flex-wrap">
        <a-button type="primary" html-type="submit">Зарегистрироваться</a-button>
        <a-button @click="emit('closeModal')">Отмена</a-button>
      </div>

    </a-form>
  </a-card>
</template>