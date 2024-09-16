<script setup>
import AuthLayout from './layouts/AuthLayout.vue';
import NotAuthLayout from '@/layouts/NotAuthLayout.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const layout = computed(() => route.meta.layout === 'auth-layout' ? AuthLayout : NotAuthLayout)
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>