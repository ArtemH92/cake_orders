import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import api from '@/api'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const users = reactive([])
  const user = reactive({})
  const token = ref(null)
  const error = ref(null)
  const router = useRouter()

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
        console.log(err.response.data.message)
      })
  }

  const register = async (userData) => {
    await api
      .post('/users/register', userData)
      .then()
      .catch((err) => {
        error.value = err.message
      })
  }

  const getUser = async () => {
    await api
      .get('/users/current')
      .then((response) => {
        Object.assign(user, response.data)
      })
      .catch((err) => {
        error.value = err.message
      })
  }

  const getUsers = async () => {
    await api
      .get('/users/')
      .then((response) => {
        Object.assign(users, response.data)
      })
      .catch((err) => error.value = err.message)
  }

  const editUser = async (id, data) => {
    await api
      .put(`/users/current/edit/${id}`, data)
      .then((response) => {
        Object.assign(user, response.data)
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

  return { user, users, token, error, login, register, getUser, getUsers, editUser, removeUser, logout }
})