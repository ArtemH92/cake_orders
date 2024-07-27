import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import api from '@/api'

export const useOrderStore = defineStore('orders', () => {
  const orders = reactive([])
  const order = reactive({})
  const error = ref(null)

  const getAll = async () => {
    await api 
      .get('/orders/')
      .then((response) => {
        Object.assign(orders, response.data)
      })
      .catch((err) => {
        error.value = err.message
      })
  }

  const addOrder = async (data) => {
    await api 
      .post('/orders/add', data)
      .then()
      .catch((err) => {
        error.value = err.message
      })
  }

  return { orders, order, error, getAll, addOrder }
})