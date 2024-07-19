import { defineStore } from 'pinia';
import { reactive } from 'vue';
import api from '@/api';
import type { OrderAddState } from "@/models/types"

export const useOrderStore = defineStore('order', () => {
  const orders = reactive([])
  const order = reactive({})

  const getAllOrders = () => {
    api.get('/orders').then((response) => {
      Object.assign(orders, response.data)
    })
  }

  const getOrder = () => {

  }

  const createOrder = (orderData: OrderAddState) => {
    api.post<OrderAddState>('/orders/add', orderData).then((response) => {
      console.log(response)
    }).catch((err) => {
      console.log(err.message)
    })
  }

  const editOrder = () => {
    
  }

  return { orders, order, getAllOrders, getOrder, createOrder, editOrder }
})