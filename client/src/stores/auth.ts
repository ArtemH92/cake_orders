import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import api from '@/api'

interface User {
  username: string
  password: string
}

interface ResponseLoginData extends User {
  token: string
}
export const useAuthStore = defineStore('auth', () => {
  let user = reactive({})
  const token = ref<null | string>(null)
  const error = ref<null | string>(null)

  const login = async (userData: User) => {
    try {
      const { data } = await api.post<ResponseLoginData>('/users/login', userData)
      localStorage.setItem('token', data.token)
      user = data
      token.value = data.token
    } catch (err) {
      error.value = err.message
    }
  }

  const register = async (userData: User) => {
    try {
      const { data } = await api.post<ResponseLoginData>('/users/register', userData)
      localStorage.setItem('token', data.token)
      user.value = data
      token.value = data.token
      error.value = null
    } catch (err) {
      error.value = err.message
    }
  }

  const currentUser = async () => {
    await api.get<ResponseLoginData>('/users/current').then((response) => {
      user.value = response.data
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    user.value = null
    token.value = null
  }
  return { user, login, register, currentUser, logout }
})
