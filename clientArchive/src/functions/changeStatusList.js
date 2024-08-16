import { useOrderStore } from '@/stores/orders'

const { editOrder } = useOrderStore()

export const changeStatusOrder = (id, status) => {
  const statusOrder =
    status === 'inProcessing' ? 'inProgress' : status === 'inProgress' ? 'done' : ''
  const data = {
    id,
    status: statusOrder
  }
  editOrder(id, data)
}