import type { LoginFormState, RegisterFormState } from './types'
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