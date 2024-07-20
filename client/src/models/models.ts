import type { LoginFormState, RegisterFormState, AddOrder } from './types'
import { reactive } from 'vue'

export const LoginDataState = reactive<LoginFormState>({
  username: '',
  password: ''
})

export const RegisterDataState = reactive<RegisterFormState>({
  username: '',
  password: '',
  confirmPassword: ''
})

export const AddOrderDataState = reactive<AddOrder>({
  dessert: '',
  cakeType: '',
  cupcakesType: '',
  filling: '',
  quantity: null,
  photo: '',
  date: '',
  time : '',
  notes: '',
})