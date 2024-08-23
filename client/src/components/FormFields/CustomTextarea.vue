<script setup>
import FloatLabel from 'primevue/floatlabel';
import Textarea from 'primevue/textarea';

const model = defineModel()
const props = defineProps({
  label: String,
})
</script>

<template>
  <FloatLabel>
    <Textarea v-model="model" cols="25" :autoResize="true" />
    <label>{{ props.label }}</label>
  </FloatLabel>
</template>
