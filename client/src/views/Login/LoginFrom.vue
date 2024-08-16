<script setup>
import { reactive } from 'vue';
import CustomButton from '@/components/CustomButton.vue';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const emit = defineEmits(['submit'])

const userInfo = reactive({
  username: '',
  password: ''
})

const hendler = (data) => {
  emit('submit', data)
}
</script>

<template>
  <form
    autocomplete="off"
    @submit.prevent="hendler(userInfo)"
  >
    <FloatLabel class="mt-6">
      <InputText v-model="userInfo.username" id="username"/>
      <label for="username">Имя пользователя</label>
    </FloatLabel>

    <FloatLabel class="mt-6">
      <Password :feedback="false" v-model="userInfo.password" id="password" />
      <label for="password">Пароль</label>
    </FloatLabel>

    <div class="flex justify-center mt-6">
      <CustomButton :label="'Войти'" :icon="'login'" :type="'submit'"/>
    </div>
  </form>
</template>