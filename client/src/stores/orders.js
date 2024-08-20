import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import api from '@/api'
import { AllOrders } from '@/models/order'
import { useToast } from 'primevue/usetoast'

export const useOrderStore = defineStore('orders', () => {
  const orders = reactive([])
  const order = reactive({})
  const error = ref(null)
  const toast = useToast()
  const loader = ref(false)

  const getAll = async () => {
    loader.value = true
    await api 
      .get('/orders/')
      .then((response) => {
        if(response.data.length === 0) {
          orders.splice(0, orders.length)
        }
        Object.assign(orders, response.data.map(el => new AllOrders(el)))
      })
      .catch((err) => {
        toast.add({severity: 'error', summary: 'Ошибка!', detail: err, life: 3000})
      })
      .finally(() => {
        loader.value = false
      })
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
        toast.add({severity: 'error', summary: 'Ошибка!', detail: err, life: 3000})
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
      .catch((err) => toast.add({severity: 'error', summary: 'Ошибка!', detail: err, life: 3000}) )
  }

  const getOrder = async(id) => {
    await api 
      .get(`/orders/${id}`)
      .then((response) => {
        Object.assign(order, response.data)
      })
      .catch((err) => toast.add({severity: 'error', summary: 'Ошибка!', detail: err, life: 3000}) )
      .finally()
  }

  const loading = computed(() => loader)
 
  return { orders, order, error, loading, getAll, addOrder, remove, editOrder, getOrder }
})