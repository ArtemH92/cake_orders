<script setup>
const emit = defineEmits(['addOrder'])
const props = defineProps({
  title: String,
  btnText: String
})

</script>

<template>
  <a-space class="max-w-4xl mx-auto w-full flex justify-between" align="center">
    <a-typography-title :level="2" class="!text-white !mt-1 flex-grow">
      {{ props.title }}
    </a-typography-title>
    <a-button type="primary" class="text-white" @click="emit('addOrder')">
      {{ props.btnText }}
    </a-button>
  </a-space>
</template>