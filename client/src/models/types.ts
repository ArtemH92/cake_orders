export interface LoginFormState {
  username: string
  password: string
}

export interface RegisterFormState extends LoginFormState {
  confirmPassword: string
}