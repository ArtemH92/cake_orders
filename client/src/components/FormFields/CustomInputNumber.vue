<script setup>
import FloatLabel from 'primevue/floatlabel';
import InputNumber from 'primevue/inputnumber';

const model = defineModel()
const props = defineProps({
  errors: String,
  label: String,
  minValue: Number
})
</script>

<template>
  <div>
    <FloatLabel>
      <InputNumber
        v-model="model"
        :invalid="errors != ''"
        :min="props.minValue"
        :aria-describedby="`${model}-error`"
      />
      <label>{{ props.label }}</label>
    </FloatLabel>
    <small :id="`${model}-error`" class="text-red-500">
      {{ errors }}
    </small>
  </div>
</template>
