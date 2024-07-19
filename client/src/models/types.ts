export interface LoginUserFormState {
  username: string
  password: string
}

export interface RegisterUserFormState extends LoginUserFormState {
  confirmPassword: string
}

export interface OrderAddState {
  dessert: string
  cakeType?: string
  cupcakesType?: string
  filling?: string
  quantity?: number | null
  photo?: string
  date: string
  time: string
  notes: string
}