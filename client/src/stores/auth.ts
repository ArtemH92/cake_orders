import { defineStore } from 'pinia';
import api from '@/api';

interface User {
  username: string
  password: string
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
        const { data } = await api.post<ResponseLoginData>('/users/login', userData);
        localStorage.setItem('token', data.token);
        this.user = data;
        this.token = data.token;
      } catch (error) {
        this.error = error.message;
      }
    },
    async register(userData: User) {
      try {
        const { data } = await api.post<ResponseLoginData>('/users/register', userData);
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
        const { data } = await api.get<ResponseLoginData>('/users/current');
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