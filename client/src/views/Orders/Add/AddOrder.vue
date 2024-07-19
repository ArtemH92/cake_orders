<script setup lang="ts">
import type { OrderAddState } from '@/models/types'
import type { FormInstance } from 'ant-design-vue'
import { OrderAdd } from '@/models/models'
import { reactive, ref } from 'vue'
import { useOrderStore } from '@/stores/orders'
import { useAuthStore } from '@/stores/auth'
import HomeHeader from '@/components/HomeHeader.vue'
import { OrdersChoices } from '@/lib/choices'
import { LayoutLogin, RulesAddOrder } from '@/lib/formConfig'


const formRef = ref<FormInstance>()
const { desert, cakeType, cupcakeType, cupcakeFilling } = OrdersChoices
const { createOrder } = useOrderStore()
const { user } = useAuthStore()

const choiseDessert = (value: string) => {
  if (value === 'cake') {
    OrderAdd.cupcakesType = ''
    OrderAdd.filling = ''
    OrderAdd.quantity = null
  }
  if (value === 'cupcake') {
    OrderAdd.cakeType = ''
  }
}
const fetchCreateOrder = (values: OrderAddState) => {
  console.log(values)
  createOrder(values)
}

const handleFinishFailed = (errors: any) => {
  console.log(errors)
}
</script>

<template>
  <a-space direction="vertical" class="mx-auto">
    <HomeHeader
      :title="'Создание заказа'"
      :btn-text="'Вернуться на лист заказов'"
      :path="'/orders/list'"
    />
    <a-card>
      <a-form
        ref="formRef"
        name="login_form"
        autocomplete="off"
        :model="OrderAdd"
        :rules="RulesAddOrder"
        v-bind="LayoutLogin"
        @finish="fetchCreateOrder(OrderAdd)"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item label="Изделие">
          <a-select
            ref="select"
            v-model:value="OrderAdd.dessert"
            @change="choiseDessert(OrderAdd.dessert)"
          >
            <a-select-option v-for="(el, i) of desert" :key="i" :value="el.value">
              {{ el.label }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Торт" v-if="OrderAdd.dessert === 'cake'">
          <a-select ref="select" v-model:value="OrderAdd.cakeType">
            <a-select-option v-for="(el, i) of cakeType" :key="i" :value="el.value">
              {{ el.label }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Тип капкейка" v-if="OrderAdd.dessert === 'cupcake'">
          <a-select ref="select" v-model:value="OrderAdd.cupcakesType">
            <a-select-option v-for="(el, i) of cupcakeType" :key="i" :value="el.value">
              {{ el.label }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Начинка капкейка" v-if="OrderAdd.dessert === 'cupcake'">
          <a-select ref="select" v-model:value="OrderAdd.filling">
            <a-select-option v-for="(el, i) of cupcakeFilling" :key="i" :value="el.value">
              {{ el.label }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Количество капкейков" v-if="OrderAdd.dessert === 'cupcake'">
          <a-input-number v-model:value="OrderAdd.quantity" :min="9" />
        </a-form-item>

        <!-- Здесь будет фото -->

        <a-form-item label="Дата исполнения">
          <a-input v-model:value="OrderAdd.date" />
        </a-form-item>

        <a-form-item label="Время заказа">
          <a-input v-model:value="OrderAdd.time" />
        </a-form-item>

        <a-form-item label="Примечания">
          <a-input v-model:value="OrderAdd.notes" />
        </a-form-item>

        <a-form-item class="flex justify-center">
          <a-button type="primary" html-type="submit">Создать заказ</a-button>
        </a-form-item>

      </a-form>
    </a-card>
  </a-space>
</template>
