<script setup>
import { useOrderStore } from '@/stores/orders';
import { onMounted } from 'vue';
import TableOrders from './TableOrders.vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import StubTable from './StubTable.vue';



const store = useOrderStore()
const router = useRouter()
store.getAll()
onMounted(() => {
  store.getAll()
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
    store.editOrder(data.id, data)
  }
  modalVisible.value = false
}
</script>

<template>
  <div>
    <StubTable v-if="store.loading" />
    <TableOrders
      v-else
      :orders="store.orders"
      @remove="(data) => modalHandler('remove', data)"
      @edit="(data) => router.push(`/orders/edit/${data.id}`)"
      @status="(data) => modalHandler('status', data)"
    />
    <ConfirmModal v-model="modalVisible" @confirm="confirmModalHandler" @cancel="modalVisible = false"/>
  </div>
</template>