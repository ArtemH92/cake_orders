import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import api from '@/api'
import { AllOrders, SingleOrder } from '@/models/order'
import { useToast } from 'primevue/usetoast'

export const useOrderStore = defineStore('orders', () => {
  const orders = reactive([])
  const order = reactive({})
  const toast = useToast()
  const loader = ref(false)

  const getAll = async () => {
    loader.value = true;
    try {
      const response = await api.get('/orders/');
      if (response.data.length === 0) {
          orders.splice(0, orders.length);
      } else {
          orders.splice(0, orders.length, ...response.data.map(el => new AllOrders(el)));
      }
    } catch (err) {
        toast.add({ severity: 'error', summary: 'Ошибка!', detail: err.message || err, life: 3000 });
    } finally {
        loader.value = false;
    }
  }

  const addOrder = async (data, successModal) => {
    try {
      await api.post('/orders/add', data)
      await getAll()
      successModal()
    } catch (err) {
      toast.add({ severity: 'error', summary: 'Ошибка!', detail: err.message || err, life: 3000 })
    }
  }


  const remove = async (id) => {
    try {
      await api.post(`/orders/remove/${id}`)
      await getAll()
    } catch (err) {
      toast.add({ severity: 'error', summary: 'Ошибка!', detail: err.message || err, life: 3000 })
    }
  }
  
  const editOrder = async (id, data, successModal) => {
    try {
      const response = await api.put(`/orders/edit/${id}`, data)
      Object.assign(order, response.data)
      getAll()
      successModal()
    } catch (err) {
      toast.add({ severity: 'error', summary: 'Ошибка!', detail: err.message || err, life: 3000 })
    }
  }

  const getOrder = async (id) => {
    try {
      const response = await api.get(`/orders/${id}`)
      Object.assign(order, new SingleOrder(response.data))
    } catch (err) {
      toast.add({ severity: 'error', summary: 'Ошибка!', detail: err.message || err, life: 3000 })
    }
  }

  const loading = computed(() => loader)
 
  return { orders, order, loading, getAll, addOrder, remove, editOrder, getOrder }
})