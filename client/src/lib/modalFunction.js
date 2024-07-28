import { ref } from "vue";
import { hendlerModal } from '@/functions/modal'
import { useOrderStore } from "@/stores/orders";

const { getOrder } = useOrderStore()

export const idOrder = ref('')
export const statusOrder = ref('')

export const modalRemove = (id, value) => {
  idOrder.value = id
  hendlerModal(true, value)
}

export const modalChangeStatus = (id, status) => {
  idOrder.value = id
  statusOrder.value = status
  hendlerModal(true, 'changeStatus')
}

export const modalEdit = (id, status) => {
  getOrder(id)
  idOrder.value = id
  statusOrder.value = status
  hendlerModal(true, 'edit')
}
