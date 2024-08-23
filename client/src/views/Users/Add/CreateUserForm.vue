<script setup>
import { reactive } from 'vue';
import { schemaUser } from '@/models/schemas'
import { useForm } from 'vee-validate'
import Checkbox from 'primevue/checkbox';
import CustomButton from '@/components/CustomButton.vue';
import CustomInputText from '@/components/FormFields/CustomInputText.vue'
import CustomInputPassword from '@/components/FormFields/CustomInputPassword.vue'
import CustomInputMask from '@/components/FormFields/CustomInputMask.vue'

const emit = defineEmits(['finish'])

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schemaUser
})

const userData = reactive({
  username: defineField('username')[0],
  password: defineField('password')[0],
  confirmPassword: defineField('confirmPassword')[0],
  administrator: defineField('administrator')[0],
  phone: defineField('phone')[0],
})

const finish = handleSubmit((data) => {
  emit('finish', data)
})
</script>

<template>
  <div>
    <form autocomplete="off" @submit.prevent="finish()">
      <CustomInputText 
        v-model="userData.username"
        label="Имя пользователя"
        :errors="!errors.username ? '' : errors.username"
      />

      <CustomInputPassword 
        class="mt-6"
        v-model="userData.password"
        label="Пароль"
        :errors="!errors.password ? '' : errors.password"
      />

      <CustomInputPassword 
        class="mt-6"
        v-model="userData.confirmPassword"
        label="Повторите пароль"
        :errors="!errors.confirmPassword ? '' : errors.confirmPassword"
      />

      <CustomInputMask 
        class="mt-6"
        v-model="userData.phone"
        label="Номер телефона"
        :errors="!errors.phone ? '' : errors.phone"
        maska="+375 (##) ### ## ##"
      />

      <div class="mt-6 w-full flex justify-between">
        <label for="admin">Права администратора</label>
        <Checkbox v-model="userData.administrator" binary input-id="admin" />
      </div>

      <div class="mt-6 flex justify-center">
        <CustomButton label="Создать" type="submit" />
      </div>
    </form>
  </div>
</template>