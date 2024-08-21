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
        <InputText v-model="userData.username" />
        <label>Имя пользователя</label>
      </FloatLabel> 

      <FloatLabel class="mt-6">
        <Password v-model="userData.password" :feedback="false" />
        <label>Пароль</label>
      </FloatLabel> 

      <FloatLabel class="mt-6">
        <Password v-model="userData.confirmPassword" :feedback="false" />
        <label>Повторите пароль</label>
      </FloatLabel> 

      <FloatLabel class="mt-6">
        <InputText v-model="userData.phone" v-maska data-maska="+375 (##) ### ## ##" />
        <label>Номер телефона</label>
      </FloatLabel> 

      <div class="mt-6">
        <label for="admin" class="mr-4">Права администратора</label>
        <Checkbox v-model="userData.administrator" binary input-id="admin" />
      </div>

      <div class="mt-6 flex justify-center">
        <CustomButton label="Создать" type="submit" />
      </div>
    </form>
  </div>
</template>