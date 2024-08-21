export class CreateUserData {
  constructor(data = {
    username: '',
    password: '',
    confirmPassword: '',
    administrator: false,
    phone: '',
  })
  {
    this.username = data.username
    this.password = data.password
    this.confirmPassword = data.confirmPassword
    this.administrator = data.administrator
    this.phone = data.phone
  }
}