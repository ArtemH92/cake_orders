import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import api from '@/api'

export const useAuthStore = defineStore('auth', () => {
  const user = reactive({})
  const token = ref(null)
  const error = ref(null)

  const login = async (userData) => {
    await api
      .post('/users/login', userData)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        Object.assign(user, response.data)
        token.value = response.data.token
      })
      .catch((err) => {
        error.value = err.message
      })
  }

  const register = async (userData) => {
    await api
      .post('/users/register', userData)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        Object.assign(user, response.data)
        token.value = response.data.token
        error.value = null
      })
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

  const logout = () => {
    localStorage.removeItem('token')
    Object.keys(user).forEach(key => delete user[key])
    token.value = null
  }

  return { user, token, error, login, register, getUser, logout }
})