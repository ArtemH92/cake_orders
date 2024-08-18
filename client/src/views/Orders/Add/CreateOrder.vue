<script setup>
import { reactive } from 'vue';
import { useOrderStore } from '@/stores/orders';
import ListTitle from '@/components/ListTitle.vue';
import FloatLabel from 'primevue/floatlabel';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import DatePicker from 'primevue/datepicker';
import CustomButton from '@/components/CustomButton.vue';
import { Choices } from '@/lib/choicesSelect';
import { CreateOrderData, SendCreateOrderData } from '@/models/order';

const { dessertChoice, cakeTypeChoice, cupcakesTypeChoice, fillingChoice } = Choices
const { addOrder } = useOrderStore()
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

const handleFinish = (data) => {
  const sendData = new SendCreateOrderData(data)
  sendData.status = 'inProcessing'
  addOrder(sendData)
}

</script>

<template>
  <div>
    <list-title url="/orders/list" btn-label="Вернуться к списку заказов" title="Создание заказа" />
    <div class="flex justify-center mt-5">
      <div class="bg-white rounded-md p-7">
        <form
          autocomplete="off"
          @submit.prevent="handleFinish(orderData)"
        >
          <FloatLabel>
            <Select v-model="orderData.dessert" :options="dessertChoice" optionLabel="label" class="w-full md:w-52" @change="ChangeHandler(orderData)" />
            <label>Изделие</label>
          </FloatLabel>

          <FloatLabel class="mt-6" v-if="orderData.dessert?.code === 'cake'">
            <Select v-model="orderData.cakeType" :options="cakeTypeChoice" optionLabel="label" class="w-full md:w-52" />
            <label>Торт</label>
          </FloatLabel>

          <FloatLabel class="mt-6" v-if="orderData.dessert?.code === 'cupcake'">
            <Select v-model="orderData.cupcakesType" :options="cupcakesTypeChoice" optionLabel="label" class="w-full md:w-52" />
            <label>Капкейк</label>
          </FloatLabel>

          <FloatLabel class="mt-6" v-if="orderData.dessert?.code === 'cupcake'">
            <Select v-model="orderData.filling" :options="fillingChoice" optionLabel="label" class="w-full md:w-52" />
            <label>Начинка</label>
          </FloatLabel>

          <FloatLabel class="mt-6" v-if="orderData.dessert?.code === 'cupcake'">
            <InputNumber v-model="orderData.quantity" :min="9" />
            <label>Количество</label>
          </FloatLabel>

          <FloatLabel class="mt-6">
            <DatePicker v-model="orderData.date" date-format="dd mm yy" />
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
      </div>
    </div>
  </div>
</template>