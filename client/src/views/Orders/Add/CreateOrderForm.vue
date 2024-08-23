<script setup>
import { ref, reactive } from 'vue'
import { Choices } from '@/lib/choicesSelect'
import { useForm } from 'vee-validate'
import { schemaCreateOrder } from '@/models/schemas'
import CustomInputNumber from '@/components/FormFields/CustomInputNumber.vue'
import CustomSelect from '@/components/FormFields/CustomSelect.vue'
import CustomButton from '@/components/CustomButton.vue'
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

const formData = reactive({ dessert, cakeType, cupcakesType, filling, quantity, dateTime, notes })

const ChangeHandler = (dessert) => {
  if (dessert === 'cake') {
    formData.cupcakesType = ''
    formData.filling = ''
    formData.quantity = null
  }

  if (dessert === 'cupcake') {
    formData.cakeType = ''
  }
}

const finish = handleSubmit((data) => {
  const order = data
  order.status = 'inProcessing'
  emit('finish', order)
})

const date = ref(new Date())
date.value.setDate(date.value.getDate() + 3)
</script>

<template>
  <form autocomplete="off" @submit.prevent="finish()">
    <CustomSelect
      v-model="formData.dessert"
      :options="dessertChoice"
      :errors="!errors.dessert ? '' : errors.dessert"
      label="Изделие"
      @changeField="ChangeHandler(formData.dessert)"
    />

    <CustomSelect
      class="mt-6"
      v-if="formData.dessert === 'cake'"
      v-model="formData.cakeType"
      :options="cakeTypeChoice"
      :errors="!errors.cakeType ? '' : errors.cakeType"
      label="Торт"
    />

    <CustomSelect
      class="mt-6"
      v-if="formData.dessert === 'cupcake'"
      v-model="formData.cupcakesType"
      :options="cupcakesTypeChoice"
      :errors="!errors.cupcakesType ? '' : errors.cupcakesType"
      label="Капкейк"
    />

    <CustomSelect
      class="mt-6"
      v-if="formData.dessert === 'cupcake'"
      v-model="formData.filling"
      :options="fillingChoice"
      :errors="!errors.filling ? '' : errors.filling"
      label="Начинка"
    />

    <CustomInputNumber
      v-if="formData.dessert === 'cupcake'"
      v-model="formData.quantity"
      :min-value="9"
      :errors="!errors.quantity ? '' : errors.quantity"
      class="mt-6"
      label="Количество"
    />

    <CustomDatePicker 
      class="mt-6"
      v-model="formData.dateTime"
      :errors="!errors.dateTime ? '' : errors.dateTime"
      :min-date="date"
      label="Дата и время"
    />

    <CustomTextarea v-model="formData.notes" class="mt-6" label="Примечания" />

    <div class="mt-6 flex justify-center">
      <CustomButton label="Создать" type="submit" />
    </div>
  </form>
</template>