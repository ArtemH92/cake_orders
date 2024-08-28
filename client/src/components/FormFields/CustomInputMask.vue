<script setup>
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import { vMaska } from 'maska'

const model = defineModel()
const props = defineProps({
  label: String,
  disabled: Boolean,
  errors: {
    type: String,
    default: ''
  },
  maska: String
})
</script>

<template>
  <div>
    <FloatLabel>
      <InputText
        v-model="model"
        class="w-full"
        :invalid="errors != ''"
        :disabled="props.disabled"
        :aria-describedby="`${model}-error`"
        v-maska 
        :data-maska="maska"
      />
      <label>{{ props.label }}</label>
    </FloatLabel>
    <small :id="`${model}-error`" class="text-red-500">
      {{ errors }}
    </small>
  </div>
</template>
