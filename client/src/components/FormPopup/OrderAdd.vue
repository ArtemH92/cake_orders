<script setup>
import { reactive, ref } from 'vue'
import { Choices } from '@/lib/choicesSelect'
import { LayoutLogin } from '@/lib/formConfig'
import { CreateOrder } from '@/models/orders/createOrder.module'
import { useOrderStore } from '@/stores/orders'

const emit = defineEmits(['closeModal'])
const orderData = reactive(new CreateOrder())
const { dessert, cakeType, cupcakesType, filling } = Choices
const formRef = ref()
const { addOrder } = useOrderStore()

const handleFinish = (data) => {
  console.log(data)
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
</script>

<template>
  <a-card class="w-full max-w-[500px] sm:max-w-[375px] md:max-w-[500px]">
    <a-typography-title :level="2" class="text-center !text-[clamp(2rem,0.8rem+2vw,2.5rem)]">
      Добавление заказа
    </a-typography-title>
    <a-form
      ref="formRef"
      name="login_form"
      autocomplete="off"
      class="mt-8"
      :model="orderData"
      v-bind="LayoutLogin"
      @finish="handleFinish(orderData)"
    >
      <a-form-item label="Изделие">
        <a-select ref="select" v-model:value="orderData.dessert" @change="ChangeHandler()">
          <a-select-option :value="item.value" v-for="(item, i) of dessert" :key="i">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Торт" v-if="orderData.dessert === 'cake'">
        <a-select ref="select" v-model:value="orderData.cakeType">
          <a-select-option :value="item.value" v-for="(item, i) of cakeType" :key="i">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Капкейк" v-if="orderData.dessert === 'cupcake'">
        <a-select ref="select" v-model:value="orderData.cupcakesType">
          <a-select-option :value="item.value" v-for="(item, i) of cupcakesType" :key="i">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Начинка" v-if="orderData.dessert === 'cupcake'">
        <a-select ref="select" v-model:value="orderData.filling">
          <a-select-option :value="item.value" v-for="(item, i) of filling" :key="i">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Количество" v-if="orderData.dessert === 'cupcake'">
        <a-input-number :min="9" v-model:value="orderData.quantity" />
      </a-form-item>

      <a-form-item label="Фото">
        <a-input type="text" v-model:value="orderData.photo" />
      </a-form-item>

      <a-form-item label="Дата">
        <a-date-picker placeholder="" v-model:value="orderData.date" />
      </a-form-item>

      <a-form-item label="Время">
        <a-time-picker placeholder="" v-model:value="orderData.time" format="HH:mm" />
      </a-form-item>

      <a-form-item label="Примечания">
        <a-textarea type="text" autoSize v-model:value="orderData.notes" />
      </a-form-item>

      <div class="flex justify-evenly">
        <a-button type="primary" html-type="submit">Создать заказ</a-button>
        <a-button @click="emit('closeModal')">Отмена</a-button>
      </div>
    </a-form>
  </a-card>
</template>
