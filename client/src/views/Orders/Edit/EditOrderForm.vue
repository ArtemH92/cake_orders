<script setup>
import { reactive, ref } from 'vue';
import FloatLabel from 'primevue/floatlabel'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import DatePicker from 'primevue/datepicker'
import CustomButton from '@/components/CustomButton.vue'
import { Choices } from '@/lib/choicesSelect'

const { dessertChoice, cakeTypeChoice, cupcakesTypeChoice, fillingChoice } = Choices
const emit = defineEmits(['finish', 'cancel'])
const props = defineProps({
  data: Object
})
const orderData = reactive(props.data)

const disabled = ref(true)

const ChangeHandler = (data) => {
  if (data.dessert === 'cake') {
    data.cupcakesType = ''
    data.filling = ''
    data.quantity = null
  }

  if (data.dessert === 'cupcake') {
    data.cakeType = ''
  }
}

const date = ref(new Date());
date.value.setDate(date.value.getDate() + 3)

const cancel = () => {
  disabled.value = true
  emit('cancel')
}
</script>

<template>
  <div class="bg-white rounded-md p-7">
    <form autocomplete="off" @submit.prevent="emit('finish', orderData)" @reset="cancel">
      <FloatLabel>
        <Select
          v-model="orderData.dessert"
          :options="dessertChoice"
          optionLabel="label"
          optionValue="value"
          class="w-full md:w-52"
          @change="ChangeHandler(orderData)"
          :disabled="disabled"
        />
        <label>Изделие</label>
      </FloatLabel>

      <FloatLabel class="mt-6" v-if="orderData.dessert === 'cake'">
        <Select
          v-model="orderData.cakeType"
          :options="cakeTypeChoice"
          optionLabel="label"
          optionValue="value"
          class="w-full md:w-52"
          :disabled="disabled"
        />
        <label>Торт</label>
      </FloatLabel>

      <FloatLabel class="mt-6" v-if="orderData.dessert === 'cupcake'">
        <Select
          v-model="orderData.cupcakesType"
          :options="cupcakesTypeChoice"
          optionLabel="label"
          optionValue="value"
          class="w-full md:w-52"
          :disabled="disabled"
        />
        <label>Капкейк</label>
      </FloatLabel>

      <FloatLabel class="mt-6" v-if="orderData.dessert === 'cupcake'">
        <Select
          v-model="orderData.filling"
          :options="fillingChoice"
          optionLabel="label"
          optionValue="value"
          class="w-full md:w-52"
          :disabled="disabled"
        />
        <label>Начинка</label>
      </FloatLabel>

      <FloatLabel class="mt-6" v-if="orderData.dessert === 'cupcake'">
        <InputNumber v-model="orderData.quantity" :min="9" :disabled="disabled" />
        <label>Количество</label>
      </FloatLabel>

      <FloatLabel class="mt-6">
        <DatePicker v-model="orderData.dateTime" dateFormat="dd mm yy" :disabled="disabled" :min-date="date" showTime hourFormat="24" />
        <label>Дата</label>
      </FloatLabel>

      <FloatLabel class="mt-6">
        <Textarea v-model="orderData.notes" cols="25" :autoResize="true" :disabled="disabled" />
        <label>Примечания</label>
      </FloatLabel>

      <div class="mt-6 flex justify-center">
        <CustomButton label="Редактировать" v-if="disabled" @click="disabled = false" />
        <div v-else class="w-full flex justify-between">
          <CustomButton label="Сохранить" type="submit" />
          <CustomButton label="Отмена" type="reset" />
        </div>
      </div>
    </form>
  </div>
</template>