<script setup>
import { reactive } from 'vue';
import { CreateUserData } from '@/models/users';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import CustomButton from '@/components/CustomButton.vue';
import { vMaska } from 'maska'

const emit = defineEmits(['finish'])

const userData = reactive(new CreateUserData())
</script>

<template>
  <div>
    <form autocomplete="off" @submit.prevent="emit('finish', userData)">
      <FloatLabel>
        <InputText v-model="userData.username" class="w-full" />
        <label>Имя пользователя</label>
      </FloatLabel> 

      <FloatLabel class="mt-6">
        <Password v-model="userData.password" :feedback="false" toggleMask />
        <label>Пароль</label>
      </FloatLabel> 

      <FloatLabel class="mt-6">
        <Password v-model="userData.confirmPassword" :feedback="false" toggleMask />
        <label>Повторите пароль</label>
      </FloatLabel> 

      <FloatLabel class="mt-6">
        <InputText v-model="userData.phone" v-maska data-maska="+375 (##) ### ## ##" class="w-full" />
        <label>Номер телефона</label>
      </FloatLabel> 

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