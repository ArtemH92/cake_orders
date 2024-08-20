import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import api from '@/api'
import { AllOrders } from '@/models/order'
import { useToast } from 'primevue/usetoast'

export const useOrderStore = defineStore('orders', () => {
  const orders = reactive([])
  const order = reactive({})
  const error = ref(null)
  const toast = useToast()

  const getAll = async () => {
    await api 
      .get('/orders/')
      .then((response) => {
        if(response.data.length === 0) {
          orders.splice(0, orders.length)
        }
        Object.assign(orders, response.data.map(el => new AllOrders(el)))
      })
      .catch((err) => {
        error.value = err.message
      })
      .finally()
  }

  const addOrder = async (data, successModal) => {
    await api 
      .post('/orders/add', data)
      .then(() => {
        getAll()
        successModal()
      })
      .catch((err) => {
        toast.add({severity: 'error', summary: 'Ошибка!', detail: err, life: 3000})
      })
      .finally()
  }


  const remove = async (id) => {
    await api
      .post(`/orders/remove/${id}`)
      .then(() => {
        getAll()
      })
      .catch((err) => {
        error.value = err.message
      })
      .finally()
  }
  
  const editOrder = async(id, data, successModal) => {
    await api
      .put(`/orders/edit/${id}`, data)
      .then((response) => {
        Object.assign(order, response.data)
        successModal()
      })
      .catch((err) => error.value = err.message )
  }

  const getOrder = async(id) => {
    await api 
      .get(`/orders/${id}`)
      .then((response) => {
        Object.assign(order, response.data)
      })
      .catch((err) => error.value = err.message )
      .finally()
  }

  return { orders, order, error, getAll, addOrder, remove, editOrder, getOrder }
})