import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import api from '@/api'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { EditGetUserData } from '@/models/users'
import { useToast } from 'primevue/usetoast'

export const useAuthStore = defineStore('auth', () => {
  const users = reactive([])
  const user = reactive({})
  const token = ref(null)
  const error = ref(null)
  const router = useRouter()
  const loader = ref(false)
  const toast = useToast()

  const login = async (userData) => {
    await api
      .post('/users/login', userData)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        Object.assign(user, response.data)
        token.value = response.data.token
        router.push('/')
      })
      .catch((err) => { 
        toast.add({ severity: 'error', summary: 'Ошибка!', detail: err.response.data.message, life: 3000 })
      })
  }

  const register = async (userData, successModal) => {
    await api
      .post('/users/register', userData)
      .then(() => successModal())
      .catch((err) => {
        error.value = err.message
      })
  }

  const getUser = async () => {
    loader.value = true
    await api
      .get('/users/current')
      .then((response) => {
        Object.assign(user, new EditGetUserData(response.data))
      })
      .catch((err) => {
        error.value = err.message
      }).finally(() => loader.value = false)
  }

  const getUsers = async () => {
    await api
      .get('/users/')
      .then((response) => {
        Object.assign(users, response.data)
      })
      .catch((err) => error.value = err.message)
  }

  const editUser = async (id, data, successModal) => {
    await api
      .put(`/users/current/edit/${id}`, data)
      .then((response) => {
        Object.assign(user, response.data)
        successModal()
        getUser()
      })
      .catch((err) => {
        error.value = err.message
      })
      
  }

  const removeUser = async (id) => {
    await api
      .post(`/users/remove/${id}`)
      .then(() => console.log('Пользователь успешно удален'))
      .catch((err) => console.log(err.response.data.message))
  }

  const logout = () => {
    localStorage.removeItem('token')
    Object.keys(user).forEach(key => delete user[key])
    token.value = null
    router.push('/login')
    console.log('Вы вышли из системы')
  }

  const loading = computed(() => loader)

  return { user, users, token, error, loading, login, register, getUser, getUsers, editUser, removeUser, logout }
})