import { defineStore } from 'pinia';
import { ref } from 'vue'
import api from '@/api';

interface User {
  username: string
  password: string
}

interface ResponseLoginData extends User {
  token: string;
}

export const useAuthStore =  defineStore('auth', () => {
  const user = ref(null as User | null)
  const token = ref(null as string | null)
  const error = ref(null as string | null)

  const login = async (userData: User) =>{
    await api.post<ResponseLoginData>('/users/login', userData).then((response) => {
      localStorage.setItem('token', response.data.token)
      user.value = response.data
      token.value = response.data.token;
    }).catch((err) => {
      error.value = err.message;
    })
  }

  const register = async (userData: User) => {
    await api.post<ResponseLoginData>('/users/register', userData).then((response) => {
      localStorage.setItem('token', response.data.token)
      user.value = response.data
      token.value = response.data.token;
    }).catch((err) => {
      error.value = err.message;
    })
  }

  const currentUser = async() => {
    await api.get<ResponseLoginData>('/users/current').then((response) => {
      localStorage.setItem('token', response.data.token)
      user.value = response.data
      token.value = response.data.token;
    }).catch((err) => {
      error.value = err.message;
    })
  }

  const logout = () => {
    localStorage.removeItem('token');
      user.value = null;
      token.value = null;
  }

  return { user, login, register, currentUser, logout }
})