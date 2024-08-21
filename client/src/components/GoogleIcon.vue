<script setup>
const props = defineProps({
  icon: String,
  color: {
    type: String,
    default: 'text-black'
  },
  size: {
    type: String,
    default: 'text-2xl'
  }
})
</script>

<template>
  <span :class="`material-icons-outlined ${color} ${size}`">{{ props.icon }}</span>
</template>

