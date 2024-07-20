import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { LoginFormState } from '@/models/types'
import api from '@/api'

interface ResponseLoginData extends LoginFormState {
  token: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = reactive<{} | LoginFormState>({})
  const token = ref<null | string>(null)
  const error = ref<null | string>(null)

  const login = async (userData: LoginFormState) => {
    await api
      .post<ResponseLoginData>('/users/login', userData)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        Object.assign(user, response.data)
        token.value = response.data.token
      })
      .catch((err) => {
        error.value = err.message
      })
  }

  const register = async (userData: LoginFormState) => {
    await api
      .post<ResponseLoginData>('/users/register', userData)
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

  const currentUser = async () => {
    await api
      .get<ResponseLoginData>('/users/current')
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

  return { user, token, error, login, register, currentUser, logout }
})