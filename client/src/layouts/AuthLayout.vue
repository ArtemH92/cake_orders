<template>
  <div class="min-h-screen bg-fuchsia-500">
    <button @click="logout">Click</button>
    <router-view />
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';

const { logout } = useAuthStore()

</script>