<script setup>
import Button from 'primevue/button';
import GoogleIcon from './GoogleIcon.vue';

const props = defineProps({
  label: String,
  icon: String,
  type: String,
  severity: String
})
</script>

<template>
  <Button :severity="props.severity" :type="props.type">
    {{ props.label }}
    <GoogleIcon :icon="props.icon" />
  </Button>
</template>

