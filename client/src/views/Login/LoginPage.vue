<script setup>
import Card from 'primevue/card';
import LoginFrom from './LoginFrom.vue';
import { useAuthStore } from '@/stores/auth';
import Toast from 'primevue/toast';

const store = useAuthStore()

const hendleSubmit = (data) => {
  store.login(data)
}
</script>

<template>
  
  <Card>
    <template #title>
      <h3 class="text-center">Авторизация</h3>
    </template>
    <template #content>
      <LoginFrom @submit="(data) => hendleSubmit(data)"/>
      <Toast />
    </template>
  </Card>
</template>