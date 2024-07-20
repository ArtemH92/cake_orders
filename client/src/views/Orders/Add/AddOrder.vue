<script setup lang="ts">
import { Choices } from '@/lib/choicesSelect'
import HomeHeader from '@/components/HomeHeader.vue'
import { AddOrderDataState } from '@/models/models';
import type { AddOrder } from '@/models/types';
import { LayoutLogin } from '@/lib/formConfig';
import { useOrderStore } from '@/stores/orders';
import { Modal } from 'ant-design-vue';
import { CheckCircleTwoTone } from '@ant-design/icons-vue';
import { h } from 'vue';
import { useRouter } from 'vue-router';

const { dessert, cakeType, cupcakesType, filling } = Choices
const { createOrder } = useOrderStore()
const router = useRouter()

const showConfirm = () => {
  Modal.confirm({
    title: 'Заказ успешно создан',
    icon: () => h(CheckCircleTwoTone),
    onOk: () => router.push('/orders/list'),
    onCancel: () => router.push('/orders/list'),
    class: 'test',
  });
}

const ChangeHandler = () => {
  if(AddOrderDataState.dessert === 'cake') {
    AddOrderDataState.cupcakesType = ''
    AddOrderDataState.filling = ''
    AddOrderDataState.quantity = null
  }

  if(AddOrderDataState.dessert === 'cupcake') {
    AddOrderDataState.cakeType = ''
  }
}

const handleFinish = (data: AddOrder) => {
  createOrder(data).then(() => showConfirm())
}

</script>

<template>
  <div>
    <HomeHeader 
      title="Создание заказа" 
      btnText="Вернуться к списку заказов" 
      path="/orders/list" 
    />
    <a-card>
      <a-form 
        ref="formRef" 
        name="login_form" 
        autocomplete="off" 
        class="mt-8"
        :model="AddOrderDataState"
        v-bind="LayoutLogin"
        @finish="handleFinish(AddOrderDataState)"
      >

        <a-form-item label="Изделие">
          <a-select ref="select" v-model:value="AddOrderDataState.dessert" @change="ChangeHandler()">
            <a-select-option :value="item.value" v-for="(item, i) of dessert" :key="i">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Торт" v-if="AddOrderDataState.dessert === 'cake'">
          <a-select ref="select" v-model:value="AddOrderDataState.cakeType">
            <a-select-option :value="item.value" v-for="(item, i) of cakeType" :key="i">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Капкейк" v-if="AddOrderDataState.dessert === 'cupcake'">
          <a-select ref="select" v-model:value="AddOrderDataState.cupcakesType">
            <a-select-option :value="item.value" v-for="(item, i) of cupcakesType" :key="i">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Начинка" v-if="AddOrderDataState.dessert === 'cupcake'">
          <a-select ref="select" v-model:value="AddOrderDataState.filling">
            <a-select-option :value="item.value" v-for="(item, i) of filling" :key="i">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Количество" v-if="AddOrderDataState.dessert === 'cupcake'">
          <a-input-number :min="9" v-model:value="AddOrderDataState.quantity" />
        </a-form-item>

        <a-form-item label="Фото">
          <a-input type="text" v-model:value="AddOrderDataState.photo" />
        </a-form-item>

        <a-form-item label="Дата">
          <a-date-picker placeholder="" v-model:value="AddOrderDataState.date" />
        </a-form-item>

        <a-form-item label="Время">
          <a-time-picker placeholder="" v-model:value="AddOrderDataState.time" format="HH:mm" />
        </a-form-item>

        <a-form-item label="Примечания">
          <a-textarea type="text" autoSize v-model:value="AddOrderDataState.notes" />
        </a-form-item>

        <a-form-item class="flex justify-center">
          <a-button type="primary" html-type="submit">Создать заказ</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

