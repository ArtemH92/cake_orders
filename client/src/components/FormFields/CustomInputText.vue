<script setup>
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'

const model = defineModel()
const props = defineProps({
  label: String,
  disabled: Boolean,
  errors: {
    type: String,
    default: ''
  },
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
      />
      <label>{{ props.label }}</label>
    </FloatLabel>
    <small :id="`${model}-error`" class="text-red-500">
      {{ errors }}
    </small>
  </div>
</template>
