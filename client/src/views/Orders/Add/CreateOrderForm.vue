<script setup>
import { ref } from 'vue'
import { Choices } from '@/lib/choicesSelect'
import { useForm } from 'vee-validate'
import { schemaCreateOrder } from '@/models/schemas'
import CustomInputNumber from '@/components/FormFields/CustomInputNumber.vue'
import CustomSelect from '@/components/FormFields/CustomSelect.vue'
import Button from 'primevue/button'
import CustomDatePicker from '@/components/FormFields/CustomDatePicker.vue'
import CustomTextarea from '@/components/FormFields/CustomTextarea.vue'

const emit = defineEmits(['finish'])
const { dessertChoice, cakeTypeChoice, cupcakesTypeChoice, fillingChoice } = Choices

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schemaCreateOrder
})

const [dessert] = defineField('dessert')
const [cakeType] = defineField('cakeType')
const [cupcakesType] = defineField('cupcakesType')
const [filling] = defineField('filling')
const [quantity] = defineField('quantity')
const [dateTime] = defineField('dateTime')
const [notes] = defineField('notes')

const ChangeHandler = (dessert) => {
  if (dessert === 'cake') {
    cupcakesType.value = ''
    filling.value = ''
    quantity.value = null
  }

  if (dessert === 'cupcake') {
    cakeType.value = ''
  }
}


const date = ref(new Date())
date.value.setDate(date.value.getDate() + 3)

const finish = handleSubmit((data) => {
  data.status = 'inProcessing'
  emit('finish', data)
})
</script>

<template>
  <form autocomplete="off" @submit.prevent="finish()">
    <CustomSelect
      v-model="dessert"
      :options="dessertChoice"
      :errors="!errors.dessert ? '' : errors.dessert"
      label="Изделие"
      @changeField="ChangeHandler(dessert)"
    />

    <CustomSelect
      class="mt-6"
      v-if="dessert === 'cake'"
      v-model="cakeType"
      :options="cakeTypeChoice"
      :errors="!errors.cakeType ? '' : errors.cakeType"
      label="Торт"
    />

    <CustomSelect
      class="mt-6"
      v-if="dessert === 'cupcake'"
      v-model="cupcakesType"
      :options="cupcakesTypeChoice"
      :errors="!errors.cupcakesType ? '' : errors.cupcakesType"
      label="Капкейк"
    />

    <CustomSelect
      class="mt-6"
      v-if="dessert === 'cupcake'"
      v-model="filling"
      :options="fillingChoice"
      :errors="!errors.filling ? '' : errors.filling"
      label="Начинка"
    />

    <CustomInputNumber
      v-if="dessert === 'cupcake'"
      v-model="quantity"
      :errors="!errors.quantity ? '' : errors.quantity"
      class="mt-6"
      label="Количество"
    />

    <CustomDatePicker 
      class="mt-6"
      v-model="dateTime"
      :errors="!errors.dateTime ? '' : errors.dateTime"
      :min-date="date"
      label="Дата и время"
    />

    <CustomTextarea v-model="notes" class="mt-6" label="Примечания" />

    <div class="mt-6 flex justify-center">
      <Button label="Создать" type="submit" />
    </div>
  </form>
</template>