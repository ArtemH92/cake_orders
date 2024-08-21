import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import api from '@/api'
import { message } from 'ant-design-vue'
import moment from 'moment'

export const useOrderStore = defineStore('orders', () => {
  const orders = reactive([])
  const order = reactive({})
  const error = ref(null)
  const loading = ref(false)

  const getAll = async () => {
    loading.value = true
    await api 
      .get('/orders/')
      .then((response) => {
        if(response.data.length === 0) {
          orders.splice(0, orders.length)
        }
        Object.assign(orders, response.data)
        loading.value = false
      })
      .catch((err) => {
        error.value = err.message
      })
      .finally(() => loading.value = false)
  }

  const addOrder = async (data) => {
    loading.value = true
    await api 
      .post('/orders/add', data)
      .then(() => {
        getAll()
        message.success('Заказ успешно создан')
        loading.value = false
      })
      .catch((err) => {
        error.value = err.message
        message.error(err.message)
      })
      .finally(() => loading.value = false)
  }

  const remove = async (id) => {
    loading.value = true
    await api
      .post(`/orders/remove/${id}`)
      .then(() => {
        getAll()
        loading.value = false
        message.success('Заказ успешно удален')
      })
      .catch((err) => {
        error.value = err.message
        message.error(err.message)
      })
      .finally(() => loading.value = false)
  
  }
  
  const editOrder = async(id, data) => {
    await api
      .put(`/orders/edit/${id}`, data)
      .then((response) => {
        Object.assign(order, response.data)
        getAll()
      })
      .catch((err) => error.value = err.message )
  }

  const getOrder = async(id) => {
    loading.value = true
    await api 
      .get(`/orders/${id}`)
      .then((response) => {
        loading.value = false
        Object.assign(order, transformDate(response.data))
      })
      .catch((err) => error.value = err.message )
      .finally(() => loading.value = false)
  }

  const transformDate = (data) => {
    return {
      ...data,
      date: moment(data.date),
      time: moment(data.time),
    }
  }

  return { orders, order, error, loading, getAll, addOrder, remove, editOrder, getOrder }
})