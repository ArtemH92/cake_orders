<script setup>
import { useOrderStore } from '@/stores/orders';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import FloatLabel from 'primevue/floatlabel'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import DatePicker from 'primevue/datepicker'
import CustomButton from '@/components/CustomButton.vue'
import { Choices } from '@/lib/choicesSelect'

const { dessertChoice, cakeTypeChoice, cupcakesTypeChoice, fillingChoice } = Choices
const emit = defineEmits(['finish'])
const route = useRoute()

onMounted(() => getOrder(route.params.id))

const { order, getOrder } = useOrderStore()
const orderData = reactive(order)

const disabled = ref(true)
</script>

<template>
  <div class="bg-white rounded-md p-7">
    <form autocomplete="off" @submit.prevent="emit('finish', orderData)">
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
        <DatePicker v-model="orderData.date" date-format="dd mm yy" :disabled="disabled" />
        <label>Дата</label>
      </FloatLabel>

      <FloatLabel class="mt-6">
        <DatePicker
          v-model="orderData.time"
          timeOnly
          placeholder="Введите в формате 00:00"
          :disabled="disabled"
        />
        <label>Время</label>
      </FloatLabel>

      <FloatLabel class="mt-6">
        <Textarea v-model="orderData.notes" cols="25" :autoResize="true" :disabled="disabled" />
        <label>Примечания</label>
      </FloatLabel>

      <div class="mt-6 flex justify-center">
        <CustomButton label="Редактировать" v-if="disabled" @click="disabled = false" />
        <div v-else class="w-full flex justify-between">
          <CustomButton label="Сохранить" type="submit" />
          <CustomButton label="Отмена" @click="disabled = true" />
        </div>
      </div>
    </form>
  </div>
</template>
