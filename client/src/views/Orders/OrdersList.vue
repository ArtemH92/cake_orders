<script setup>
import { ref } from 'vue';
import HeaderList from '@/components/HeaderList.vue';
import { useOrderStore } from '@/stores/orders';
import { ColumnsTable } from '@/lib/tableConfig';
import ModalWindow from '@/components/ModalWindow.vue';
import OrderAdd from '@/components/FormPopup/OrderAdd.vue';

const modalState = ref(false)
const modalValue = ref('')

const { orders, getAll } = useOrderStore()
getAll()

const hendlerModal = (state, value) => {
  modalState.value = state
  modalValue.value = value
}
</script>

<template>
  <HeaderList @add-order="hendlerModal(true, 'addOrder')" />
  <div class="max-w-full overflow-x-auto">
    <a-table
      :columns="ColumnsTable"
      :data-source="orders"
      :scroll="{ x: true }"
      class="md:w-auto lg:w-full xl:w-full"
    >
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'operation'">
          <a-space :compact="true" :size="['small', 'middle']">
            <a-button type="primary"> Редактировать </a-button>
            <a-button danger> Удалить </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
    <ModalWindow v-if="modalState" :is-active="modalState">
      <OrderAdd v-if="modalValue === 'addOrder'" @close-modal="hendlerModal(false, '')" />
    </ModalWindow>
  </div>
</template>
