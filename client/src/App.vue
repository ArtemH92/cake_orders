<script>
import AuthLayout from './layouts/AuthLayout.vue';
import NotAuthLayout from '@/layouts/NotAuthLayout.vue';

export default {
  components: {
    AuthLayout,
    NotAuthLayout
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout}-layout`
    }
  }
}
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>