<script setup>
import { ref, reactive } from 'vue'
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

const formData = reactive({
  id: defineField('id')[0],
  dessert: defineField('dessert')[0],
  cakeType: defineField('cakeType')[0],
  cupcakesType: defineField('cupcakesType')[0],
  filling: defineField('filling')[0],
  quantity: defineField('quantity')[0],
  dateTime: defineField('dateTime')[0],
  notes: defineField('notes')[0],
})

const disabled = ref(true)

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
      v-model="formData.dessert"
      :options="dessertChoice"
      :errors="!errors.dessert ? '' : errors.dessert"
      label="Изделие"
      :disabled="disabled"
      @changeField="ChangeHandler(formData.dessert)"
    />

    <CustomSelect
      class="mt-6"
      v-if="formData.dessert === 'cake'"
      v-model="formData.cakeType"
      :options="cakeTypeChoice"
      :errors="!errors.cakeType ? '' : errors.cakeType"
      label="Торт"
      :disabled="disabled"
    />

    <CustomSelect
      class="mt-6"
      v-if="formData.dessert === 'cupcake'"
      v-model="formData.cupcakesType"
      :options="cupcakesTypeChoice"
      :errors="!errors.cupcakesType ? '' : errors.cupcakesType"
      label="Капкейк"
      :disabled="disabled"
    />

    <CustomSelect
      class="mt-6"
      v-if="formData.dessert === 'cupcake'"
      v-model="formData.filling"
      :options="fillingChoice"
      :errors="!errors.filling ? '' : errors.filling"
      label="Начинка"
      :disabled="disabled"
    />

    <CustomInputNumber
      v-if="formData.dessert === 'cupcake'"
      v-model="formData.quantity"
      :errors="!errors.quantity ? '' : errors.quantity"
      class="mt-6"
      label="Количество"
      :disabled="disabled"
    />

    <CustomDatePicker 
      class="mt-6"
      v-model="formData.dateTime"
      :errors="!errors.dateTime ? '' : errors.dateTime"
      :min-date="date"
      label="Дата и время"
      :disabled="disabled"
    />

    <CustomTextarea v-model="formData.notes" class="mt-6" label="Примечания" :disabled="disabled" />

    <div class="mt-6 flex justify-center">
      <Button label="Редактировать" v-if="disabled" @click="disabled = false" />
      <div v-else class="w-full flex justify-between">
        <Button label="Сохранить" type="submit" />
        <Button label="Отмена" type="reset" />
      </div>
    </div>
  </form>
</template>