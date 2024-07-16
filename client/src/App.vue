<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import NotAuthLayout from '@/layouts/NotAuthLayout.vue';

export default {
  components: {
    DefaultLayout,
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
