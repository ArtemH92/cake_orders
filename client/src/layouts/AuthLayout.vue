<script setup>
import NavHeader from '@/components/NavHeader.vue';
</script>

<template>
  <div class="min-h-screen bg-fuchsia-500">
    <NavHeader />
    <main class="pt-20 p-4">
      <router-view />
    </main>
  </div>
</template>