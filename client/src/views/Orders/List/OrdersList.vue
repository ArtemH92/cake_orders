<script setup>
import { useOrderStore } from '@/stores/orders';
import { onMounted } from 'vue';
import ListTitle from '@/components/ListTitle.vue';
import TableOrders from './TableOrders.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
import { ref, reactive } from 'vue';

const { orders, getAll, remove, editOrder } = useOrderStore()

onMounted(() => {
  getAll()
})
const modalVisible = ref(false)
const modalValue = ref('')
const order = reactive({})

const modalHandler = (value, data) => {
  modalVisible.value = true
  modalValue.value = value
  Object.assign(order, data)
}

const confirmModalHandler = () => {
  if(modalValue.value === 'remove') {
    remove(order.id)
  }
  if(modalValue.value === 'status') {
    const data = {
      id: order.id,
      status: order.status === 'inProcessing' ? 'inProgress' : order.status === 'inProgress' ? 'done' : ''
    }
    editOrder(data.id, data)
    getAll()
  }
  modalVisible.value = false
}

</script>

<template>
  <div>
    <list-title url="/orders/add" btn-label="Создать заказ" title="Список заказов" />
    <TableOrders
      :orders="orders" 
      @remove="(data) => modalHandler('remove', data)"
      @edit="(data) => modalHandler('edit', data)"
      @status="(data) => modalHandler('status', data)"
    />
    <ConfirmModal v-model="modalVisible" @confirm="confirmModalHandler" @cancel="modalVisible = false"/>
  </div>
</template>