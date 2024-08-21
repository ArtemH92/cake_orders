<script setup>
const props = defineProps({
  icon: String,
  color: {
    type: String,
    default: 'text-black'
  }
})
</script>

<template>
  <span :class="`material-icons-outlined ${color}`">{{ props.icon }}</span>
</template>

