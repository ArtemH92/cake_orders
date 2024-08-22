e<script setup>
import Button from 'primevue/button';
import GoogleIcon from './GoogleIcon.vue';

const props = defineProps({
  label: String,
  icon: String,
  colorIcon: String,
  type: String,
  severity: String,
  size: String
})
</script>

<template>
  <Button :severity="props.severity" :type="props.type" :size="props.size">
    {{ props.label }}
    <GoogleIcon :icon="props.icon" :color="props.colorIcon" />
  </Button>
</template>

