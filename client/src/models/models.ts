import { reactive } from "vue"
import type { LoginUserFormState, RegisterUserFormState, OrderAddState } from "./types"

export const LoginForm = reactive<LoginUserFormState>({
  username: '',
  password: ''
})

export const RegisterForm = reactive<RegisterUserFormState>({
  username: '',
  password: '',
  confirmPassword: ''
})

export const OrderAdd = reactive<OrderAddState>({
  dessert: '',
  cakeType: '',
  cupcakesType: '',
  filling: '',
  quantity: null,
  photo: '',
  date: '',
  time: '',
  notes: '',
})