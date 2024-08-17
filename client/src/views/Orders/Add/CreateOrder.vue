<script setup>
import { reactive } from 'vue';
import ListTitle from '@/components/ListTitle.vue';
import FloatLabel from 'primevue/floatlabel';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import { Choices } from '@/lib/choicesSelect';

const { dessertChoice, cakeTypeChoice, cupcakesTypeChoice, fillingChoice } = Choices

const orderData = reactive({
  dessert: '',
  cakeType: '',
  cupcakesType: '',
  filling: '',
  quantity: null,
  photo: '',
  date: '',
  time: '',
  status: '',
  notes: ''
})

</script>

<template>
  <div>
    <list-title url="/orders/list" btn-label="Вернуться к списку заказов" title="Создание заказа" />
    <div class="flex justify-center mt-5">
      <div>
        <form
          autocomplete="off"
          @submit.prevent="hendler(orderData)"
        >
          <FloatLabel class="mt-6">
            <Select v-model="orderData.dessert" id="dessert" :options="dessertChoice" optionLabel="label" class="w-full md:w-52" />
            <label for="dessert">Изделие</label>
          </FloatLabel>

          <FloatLabel class="mt-6">
            <Select v-model="orderData.cakeType" id="cakeType" :options="cakeTypeChoice" optionLabel="label" class="w-full md:w-52" />
            <label for="cakeType">Торт</label>
          </FloatLabel>

          <FloatLabel class="mt-6">
            <Select v-model="orderData.cupcakesType" id="cupcakesType" :options="cupcakesTypeChoice" optionLabel="label" class="w-full md:w-52" />
            <label for="cupcakesType">Капкейк</label>
          </FloatLabel>

          <FloatLabel class="mt-6">
            <Select v-model="orderData.filling" id="filling" :options="fillingChoice" optionLabel="label" class="w-full md:w-52" />
            <label for="filling">Начинка</label>
          </FloatLabel>

          <FloatLabel class="mt-6">
            <InputNumber v-model="orderData.quantity" min="9" />
            <label>Количество</label>
          </FloatLabel>

          <FloatLabel class="mt-6">
            <Textarea v-model="orderData.notes" cols="25" :autoResize="true" />
            <label>Примечания</label>
        </FloatLabel>
        </form>
      </div>
    </div>
    {{ orderData }}
  </div>
</template>