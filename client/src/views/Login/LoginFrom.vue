<script setup>
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { schemaLogin } from '@/models/schemas'
import { useForm } from 'vee-validate'

const emit = defineEmits(['submit'])

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schemaLogin
})

const [username] = defineField('username')
const [password] = defineField('password')

const hendler = handleSubmit((data) => {
  emit('submit', data)
})
</script>

<template>
  <form autocomplete="off" @submit.prevent="hendler()">
    <FloatLabel class="mt-6">
      <InputText
        v-model="username"
        id="username"
        aria-describedby="username-error"
        :invalid="errors.username && errors.username != ''"
        class="w-full"
      />
      <label for="username">Имя пользователя</label>
    </FloatLabel>
    <small id="username-error" class="text-red-500">
      {{ errors.username }}
    </small>

    <FloatLabel class="mt-6">
      <Password
        :feedback="false"
        v-model="password"
        id="password"
        aria-describedby="password-error"
        toggleMask
        :invalid="errors.password && errors.password != ''"
        :class="['w-full', { 'p-invalid': errors.password }]"
      />
      <label for="password">Пароль</label>
    </FloatLabel>
    <small id="password-error" class="text-red-500">
      {{ errors.password }}
    </small>

    <div class="flex justify-center mt-6">
      <Button label="Войти" type="submit" icon="pi pi-sign-in" icon-pos="right" />
    </div>
  </form>
</template>