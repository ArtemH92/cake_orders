export class LoginData {
  constructor(data = {
    username: '',
    password: '',
  })
  {
    this.username = data.username
    this.password = data.password
  }
}