import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import api from '@/api'
import type { AddOrder } from '@/models/types'

export const useOrderStore = defineStore('order', () => {
  const orders = reactive([])
  const order = reactive<{} | AddOrder>({})
  const error = ref<null | string>(null)

  const getAll = async () => {
    await api
      .get('/orders')
      .then((response) => {
        Object.assign(orders, response.data)
      }).catch((err) => error.value = err.message )
  }

  const getOrder = async (id: string) => {
    await api
      .get(`/orders/${id}`)
      .then((response) => Object.assign(order, response.data))
      .catch((err) => error.value = err.message )
  }

  const createOrder = async(data: AddOrder) => {
    await api
      .post('/orders/add', data)
      .then()
      .catch((err) => error.value = err.message )
  }

  const editOrder = async(data: any, id: string) => {
    await api
      .put(`/orders/edit/${id}`, data)
      .then((response) => {
        Object.assign(order, response.data)
      })
      .catch((err) => error.value = err.message )
  }

  const removeOrder = async (id: string) => {
    await api
      .post(`/orders/remove/${id}`)
      .then()
      .catch((err) => error.value = err.message )
  }

  return { orders, order, error, getAll, getOrder, createOrder, editOrder, removeOrder }
})

