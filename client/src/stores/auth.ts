import { defineStore } from 'pinia';
import api from '@/api';

interface User {
  id: string
  username: string
  password: string
  createdAt: string
  updatedAt: string
  createdOrders: string
  editedOrders: string
}

interface ResponseLoginData extends User {
  token: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    error: null as string | null,
  }),
  actions: {
    async login(userData: User) {
      try {
        const { data } = await api.post<ResponseLoginData>('/user/login', userData);
        localStorage.setItem('token', data.token);
        this.user = data;
        this.token = data.token;
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    },
    async register(userData: User) {
      try {
        const { data } = await api.post<ResponseLoginData>('/user/register', userData);
        localStorage.setItem('token', data.token);
        this.user = data;
        this.token = data.token;
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    },
    async currentUser() {
      try {
        const { data } = await api.get<ResponseLoginData>('/user/current');
        this.user = data;
        this.token = data.token;
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.user = null;
      this.token = null;
    },
  },
});