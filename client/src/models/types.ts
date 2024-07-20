export interface LoginFormState {
  username: string
  password: string
}

export interface RegisterFormState extends LoginFormState {
  confirmPassword: string
}

export interface AddOrder {
  dessert: string
  cakeType: string
  cupcakesType: string
  filling: string
  quantity: number | null
  photo: string
  date: string
  time : string
  notes: string
}