<script setup>
import { schemaUser } from '@/models/schemas'
import { useForm } from 'vee-validate'
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import CustomInputText from '@/components/FormFields/CustomInputText.vue'
import CustomInputPassword from '@/components/FormFields/CustomInputPassword.vue'
import CustomInputMask from '@/components/FormFields/CustomInputMask.vue'

const emit = defineEmits(['finish'])

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schemaUser
})

const [username] = defineField('username')
const [password] = defineField('password')
const [confirmPassword] = defineField('confirmPassword')
const [administrator] = defineField('administrator')
const [phone] = defineField('phone')

const finish = handleSubmit((data) => {
  emit('finish', data)
})
</script>

<template>
  <div>
    <form autocomplete="off" @submit.prevent="finish()">
      <CustomInputText 
        v-model="username"
        label="Имя пользователя"
        :errors="!errors.username ? '' : errors.username"
      />

      <CustomInputPassword 
        class="mt-6"
        v-model="password"
        label="Пароль"
        :errors="!errors.password ? '' : errors.password"
      />

      <CustomInputPassword 
        class="mt-6"
        v-model="confirmPassword"
        label="Повторите пароль"
        :errors="!errors.confirmPassword ? '' : errors.confirmPassword"
      />

      <CustomInputMask 
        class="mt-6"
        v-model="phone"
        label="Номер телефона"
        :errors="!errors.phone ? '' : errors.phone"
        maska="+375 (##) ### ## ##"
      />

      <div class="mt-6 w-full flex justify-between">
        <label for="admin">Права администратора</label>
        <Checkbox v-model="administrator" binary input-id="admin" />
      </div>

      <div class="mt-6 flex justify-center">
        <Button label="Создать" type="submit" />
      </div>
    </form>
  </div>
</template>