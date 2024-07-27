<script setup>
import { reactive, ref } from 'vue'
import { Choices } from '@/lib/choicesSelect'
import { FormLayout } from '@/lib/formConfig'
import { CreateOrder } from '@/models/orders/order.module'
import { useOrderStore } from '@/stores/orders'
import { RulesCreateOrder } from '@/lib/formConfig'

const formRef = ref();
const emit = defineEmits(['closeModal'])
const orderData = reactive(new CreateOrder())
const { dessertChoice, cakeTypeChoice, cupcakesTypeChoice, fillingChoice } = Choices
const { addOrder } = useOrderStore()

const handleFinish = (data) => {
  data.status = 'inProcessing'
  addOrder(data).then()
  emit('closeModal')
}

const ChangeHandler = () => {
  if (orderData.dessert === 'cake') {
    orderData.cupcakesType = ''
    orderData.filling = ''
    orderData.quantity = null
  }

  if (orderData.dessert === 'cupcake') {
    orderData.cakeType = ''
  }
}

const handleFinishFailed = (errors) => {
  console.log(errors)
}
</script>

<template>
  <a-card class="w-full max-w-[500px] sm:max-w-[375px] md:max-w-[500px]">
    <a-typography-title :level="2" class="text-center !text-[clamp(2rem,0.8rem+2vw,2.5rem)]">
      Добавление заказа
    </a-typography-title>
    <a-form
      ref="formRef"
      autocomplete="off"
      class="mt-8"
      :model="orderData"
      :rules="RulesCreateOrder(orderData)"
      v-bind="FormLayout"
      @finish="handleFinish(orderData)"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item label="Изделие" name="dessert">
        <a-select ref="select" v-model:value="orderData.dessert" @change="ChangeHandler()" >
          <a-select-option :value="item.value" v-for="(item, i) of dessertChoice" :key="i">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Торт" v-if="orderData.dessert === 'cake'" name="cakeType">
        <a-select ref="select" v-model:value="orderData.cakeType">
          <a-select-option :value="item.value" v-for="(item, i) of cakeTypeChoice" :key="i">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Капкейк" v-if="orderData.dessert === 'cupcake'" name="cupcakesType">
        <a-select ref="select" v-model:value="orderData.cupcakesType">
          <a-select-option :value="item.value" v-for="(item, i) of cupcakesTypeChoice" :key="i">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Начинка" v-if="orderData.dessert === 'cupcake'" name="filling">
        <a-select ref="select" v-model:value="orderData.filling">
          <a-select-option :value="item.value" v-for="(item, i) of fillingChoice" :key="i">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Количество" v-if="orderData.dessert === 'cupcake'" name="quantity">
        <a-input-number :min="9" v-model:value="orderData.quantity" />
      </a-form-item>

      <a-form-item label="Фото" name="photo">
        <a-input type="text" v-model:value="orderData.photo" />
      </a-form-item>

      <a-form-item label="Дата" name="date">
        <a-date-picker placeholder="" v-model:value="orderData.date" />
      </a-form-item>

      <a-form-item label="Время" name="time">
        <a-time-picker placeholder="" v-model:value="orderData.time" format="HH:mm" />
      </a-form-item>

      <a-form-item label="Примечания" name="notes">
        <a-textarea type="text" autoSize v-model:value="orderData.notes" />
      </a-form-item>

      <div class="flex justify-evenly">
        <a-button type="primary" html-type="submit">Создать заказ</a-button>
        <a-button @click="emit('closeModal')">Отмена</a-button>
      </div>
    </a-form>
  </a-card>
</template>
