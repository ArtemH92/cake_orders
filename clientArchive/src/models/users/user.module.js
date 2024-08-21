export class CreateUser {
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

export class SendUser {
  constructor(data = {
    username: '',
    password: '',
    administrator: false,
    phone: '',
  })
  {
    this.username = data.username
    this.password = data.password
    this.administrator = data.administrator
    this.phone = data.phone
  }
}

export class EditUser {
  constructor(data = {
    id: '',
    username: '',
    phone: '',
  })
  {
    this.id = data.id,
    this.username = data.username
    this.phone = data.phone
  }
}
