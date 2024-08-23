<script setup>
import Button from 'primevue/button'

const props = defineProps({
  label: String,
  icon: String,
  colorIcon: String,
  type: String,
  severity: String,
  size: String,
  iconPos: String
})
</script>

<template>
  <Button
    :severity="props.severity"
    :type="props.type"
    :size="props.size"
    :icon="props.icon"
    :label="props.label"
    :iconPos="props.iconPos"
  />
</template>
