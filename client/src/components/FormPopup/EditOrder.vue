<script setup>
import { reactive, ref, onMounted } from 'vue'
import { Choices } from '@/lib/choicesSelect'
import { FormLayout } from '@/lib/formConfig'
import { useOrderStore } from '@/stores/orders'
import { RulesCreateOrder } from '@/lib/formConfig'

onMounted(() => getOrder)
const formRef = ref()
const disabled = ref(true)
const emit = defineEmits(['closeModal'])

const { dessertChoice, cakeTypeChoice, cupcakesTypeChoice, fillingChoice } = Choices
const { editOrder, order, getOrder } = useOrderStore()

const orderData = reactive(order)

const handleFinish = (id, data) => {
  editOrder(id, data)
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
</script>

<template>
  <a-card class="w-full max-w-[500px] sm:max-w-[375px] md:max-w-[500px]">
    <a-typography-title :level="2" class="text-center !text-[clamp(2rem,0.8rem+2vw,2.5rem)]">
      Редактирование заказа
    </a-typography-title>
    <a-form
      ref="formRef"
      autocomplete="off"
      class="mt-8"
      :model="orderData"
      :rules="RulesCreateOrder(orderData)"
      v-bind="FormLayout"
      @finish="handleFinish(orderData.id, orderData)"
    >
      <a-form-item label="Изделие" name="dessert">
        <a-select
          ref="select"
          v-model:value="orderData.dessert"
          @change="ChangeHandler()"
          :disabled="disabled"
        >
          <a-select-option :value="item.value" v-for="(item, i) of dessertChoice" :key="i">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Торт" v-if="orderData.dessert === 'cake'" name="cakeType">
        <a-select ref="select" v-model:value="orderData.cakeType" :disabled="disabled">
          <a-select-option :value="item.value" v-for="(item, i) of cakeTypeChoice" :key="i">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Капкейк" v-if="orderData.dessert === 'cupcake'" name="cupcakesType">
        <a-select ref="select" v-model:value="orderData.cupcakesType" :disabled="disabled">
          <a-select-option :value="item.value" v-for="(item, i) of cupcakesTypeChoice" :key="i">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Начинка" v-if="orderData.dessert === 'cupcake'" name="filling">
        <a-select ref="select" v-model:value="orderData.filling" :disabled="disabled">
          <a-select-option :value="item.value" v-for="(item, i) of fillingChoice" :key="i">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Количество" v-if="orderData.dessert === 'cupcake'" name="quantity">
        <a-input-number :min="9" v-model:value="orderData.quantity" :disabled="disabled" />
      </a-form-item>

      <a-form-item label="Фото" name="photo">
        В разработке
        <!-- <a-input type="text" v-model:value="orderData.photo" /> -->
      </a-form-item>

      <a-form-item label="Дата" name="date">
        <a-date-picker placeholder="" v-model:value="orderData.date" :disabled="disabled" />
      </a-form-item>

      <a-form-item label="Время" name="time">
        <a-time-picker
          placeholder=""
          v-model:value="orderData.time"
          format="HH:mm"
          :disabled="disabled"
        />
      </a-form-item>

      <a-form-item label="Примечания" name="notes">
        <a-textarea type="text" autoSize v-model:value="orderData.notes" :disabled="disabled" />
      </a-form-item>

      <div class="flex justify-evenly">
        <a-button type="primary" @click="disabled = false" v-show="disabled"
          >Редактировать</a-button
        >
        <a-button type="primary" html-type="submit" v-show="!disabled">Сохранить</a-button>
        <a-button @click="emit('closeModal')">Отмена</a-button>
      </div>
    </a-form>
  </a-card>
</template>
