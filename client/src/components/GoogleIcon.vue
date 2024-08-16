<script setup>
const props = defineProps({
  icon: String
})
</script>

<template>
  <span class="material-icons-outlined">{{ props.icon }}</span>
</template>

