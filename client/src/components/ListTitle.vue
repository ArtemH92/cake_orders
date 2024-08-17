<script setup>
import Button from 'primevue/button';

const props = defineProps({
  title: String,
  url: String,
  btnLabel: String
})

</script>

<template>
  <div class="max-w-4xl mx-auto w-full flex justify-between items-center mt-3">
    <h1 class="text-white text-2xl font-medium">{{ props.title }}</h1>
    <Button as="router-link" :to="props.url" :label="props.btnLabel" severity="help" />
  </div>
</template>
