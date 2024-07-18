<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import moment from 'moment';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import api from '@/api';

const router = useRouter()

const { logout } = useAuthStore()

const hendleLogout = () => {
  logout()
  router.push('/login')
}

let username = ref('')

api.get('/users/current').then((response) => {
  username.value = response.data.username
})

const currentTime = ref(moment().format('YYYY-MM-DD HH:mm:ss'));

let timer: number;

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = moment().format('YYYY-MM-DD HH:mm:ss');
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <a-layout-header class="fixed w-full z-10 shadow-md px-4 flex justify-between items-center !bg-emerald-900">
    <a-typography-text class="text-white">Cake orders</a-typography-text>
    <a-typography-text class="text-white">{{ currentTime }}</a-typography-text>
    <a-typography class="text-white">{{ username }} <a-button type="primary" class="ml-4" @click="hendleLogout">Выйти</a-button></a-typography>
  </a-layout-header>
</template>