<script setup>
  const emit = defineEmits(['confirm', 'cancel'])
  const props = defineProps({
    config: Object
  })
</script>

<template>
  <a-card>
    <a-typography-title :level="2">
      {{ props.config.text }}
    </a-typography-title>
    <div class="flex justify-evenly mt-8">
      <a-button danger @click="emit('confirm')">
        {{ props.config.confirm }}
      </a-button>
      <a-button @click="emit('cancel')">
        {{ props.config.cancel }}
      </a-button>
    </div>
  </a-card>
</template>
