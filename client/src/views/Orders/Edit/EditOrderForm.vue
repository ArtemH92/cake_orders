<script setup>
import { ref } from 'vue'
import { Choices } from '@/lib/choicesSelect'
import { useForm } from 'vee-validate'
import { schemaEditOrder } from '@/models/schemas'
import CustomInputNumber from '@/components/FormFields/CustomInputNumber.vue'
import CustomSelect from '@/components/FormFields/CustomSelect.vue'
import Button from 'primevue/button'
import CustomDatePicker from '@/components/FormFields/CustomDatePicker.vue'
import CustomTextarea from '@/components/FormFields/CustomTextarea.vue'

const props = defineProps({
  data: Object
})
const emit = defineEmits(['finish', 'cancel'])
const { dessertChoice, cakeTypeChoice, cupcakesTypeChoice, fillingChoice } = Choices

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schemaEditOrder,
  initialValues: props.data,
})

const [dessert] = defineField('dessert')
const [cakeType] = defineField('cakeType')
const [cupcakesType] = defineField('cupcakesType')
const [filling] = defineField('filling')
const [quantity] = defineField('quantity')
const [dateTime] = defineField('dateTime')
const [notes] = defineField('notes')

const disabled = ref(true)

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

const finish = handleSubmit((data) => {
  data.status = 'inProcessing'
  emit('finish', data)
})

const cancel = () => {
  disabled.value = true
  emit('cancel')
}

const date = ref(new Date())
date.value.setDate(date.value.getDate() + 3)

</script>

<template>
  <form autocomplete="off" @submit.prevent="finish()" @reset="cancel">
    <CustomSelect
      v-model="dessert"
      :options="dessertChoice"
      :errors="!errors.dessert ? '' : errors.dessert"
      label="Изделие"
      :disabled="disabled"
      @changeField="ChangeHandler(dessert)"
    />

    <CustomSelect
      class="mt-6"
      v-if="dessert === 'cake'"
      v-model="cakeType"
      :options="cakeTypeChoice"
      :errors="!errors.cakeType ? '' : errors.cakeType"
      label="Торт"
      :disabled="disabled"
    />

    <CustomSelect
      class="mt-6"
      v-if="dessert === 'cupcake'"
      v-model="cupcakesType"
      :options="cupcakesTypeChoice"
      :errors="!errors.cupcakesType ? '' : errors.cupcakesType"
      label="Капкейк"
      :disabled="disabled"
    />

    <CustomSelect
      class="mt-6"
      v-if="dessert === 'cupcake'"
      v-model="filling"
      :options="fillingChoice"
      :errors="!errors.filling ? '' : errors.filling"
      label="Начинка"
      :disabled="disabled"
    />

    <CustomInputNumber
      v-if="dessert === 'cupcake'"
      v-model="quantity"
      :errors="!errors.quantity ? '' : errors.quantity"
      class="mt-6"
      label="Количество"
      :disabled="disabled"
    />

    <CustomDatePicker 
      class="mt-6"
      v-model="dateTime"
      :errors="!errors.dateTime ? '' : errors.dateTime"
      :min-date="date"
      label="Дата и время"
      :disabled="disabled"
    />

    <CustomTextarea v-model="notes" class="mt-6" label="Примечания" :disabled="disabled" />

    <div class="mt-6 flex justify-center">
      <Button label="Редактировать" v-if="disabled" @click="disabled = false" />
      <div v-else class="w-full flex justify-between">
        <Button label="Сохранить" type="submit" />
        <Button label="Отмена" type="reset" />
      </div>
    </div>
  </form>
</template>