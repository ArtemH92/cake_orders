<script setup>
import FloatLabel from 'primevue/floatlabel';
import InputNumber from 'primevue/inputnumber';

const model = defineModel()
const props = defineProps({
  errors: {
    type: String,
    default: ''
  },
  label: String,
  disabled: Boolean
})
</script>

<template>
  <div>
    <FloatLabel>
      <InputNumber
        v-model="model"
        :invalid="errors != ''"
        :aria-describedby="`${model}-error`"
        :disabled="props.disabled"
      />
      <label>{{ props.label }}</label>
    </FloatLabel>
    <small :id="`${model}-error`" class="text-red-500">
      {{ errors }}
    </small>
  </div>
</template>
