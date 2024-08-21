<script setup>
import { reactive, ref } from 'vue';
import FloatLabel from 'primevue/floatlabel';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import DatePicker from 'primevue/datepicker';
import CustomButton from '@/components/CustomButton.vue';
import { Choices } from '@/lib/choicesSelect';
import { CreateOrderData } from '@/models/order';

const emit = defineEmits(['finish'])
const { dessertChoice, cakeTypeChoice, cupcakesTypeChoice, fillingChoice } = Choices
const orderData = reactive(new CreateOrderData)

const ChangeHandler = (data) => {
  if (data.dessert.code === 'cake') {
    data.cupcakesType = ''
    data.filling = ''
    data.quantity = null
  }

  if (data.dessert.code === 'cupcake') {
    data.cakeType = ''
  }
}
const finish = (data) => {
  const order = data
  order.status = 'inProcessing'
  emit('finish', order)
}

const date = ref(new Date());
date.value.setDate(date.value.getDate() + 3)
</script>

<template>
  <form
    autocomplete="off"
    @submit.prevent="finish(orderData)"
  >
    <FloatLabel>
      <Select v-model="orderData.dessert" :options="dessertChoice" optionLabel="label" optionValue="value" class="w-full md:w-52" @change="ChangeHandler(orderData)" />
      <label>Изделие</label>
    </FloatLabel>

    <FloatLabel class="mt-6" v-if="orderData.dessert === 'cake'">
      <Select v-model="orderData.cakeType" :options="cakeTypeChoice" optionLabel="label" optionValue="value" class="w-full md:w-52" />
      <label>Торт</label>
    </FloatLabel>

    <FloatLabel class="mt-6" v-if="orderData.dessert === 'cupcake'">
      <Select v-model="orderData.cupcakesType" :options="cupcakesTypeChoice" optionLabel="label" optionValue="value" class="w-full md:w-52" />
      <label>Капкейк</label>
    </FloatLabel>

    <FloatLabel class="mt-6" v-if="orderData.dessert === 'cupcake'">
      <Select v-model="orderData.filling" :options="fillingChoice" optionLabel="label" optionValue="value" class="w-full md:w-52" />
      <label>Начинка</label>
    </FloatLabel>

    <FloatLabel class="mt-6" v-if="orderData.dessert === 'cupcake'">
      <InputNumber v-model="orderData.quantity" :min="9" />
      <label>Количество</label>
    </FloatLabel>

    <FloatLabel class="mt-6">
      <DatePicker v-model="orderData.date" date-format="dd mm yy" :min-date="date"/>
      <label>Дата</label>
    </FloatLabel>

    <FloatLabel class="mt-6">
      <DatePicker v-model="orderData.time" timeOnly placeholder="Введите в формате 00:00" />
      <label>Время</label>
    </FloatLabel>

    <FloatLabel class="mt-6">
      <Textarea v-model="orderData.notes" cols="25" :autoResize="true" />
      <label>Примечания</label>
    </FloatLabel>

    <div class="mt-6 flex justify-center">
      <CustomButton label="Создать" type="submit" />
    </div>
  </form>
</template>