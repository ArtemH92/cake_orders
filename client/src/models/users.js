export class CreateUserData {
  constructor(data = {
    id: '',
    username: '',
    password: '',
    confirmPassword: '',
    administrator: false,
    phone: '',
  })
  {
    this.id = data.username
    this.username = data.username
    this.password = data.password
    this.confirmPassword = data.confirmPassword
    this.administrator = data.administrator
    this.phone = data.phone
  }
}

export class EditGetUserData {
  constructor(data = {
    id: '',
    username: '',
    phone: '',
    administrator: false,
    createdAt: '',
    updatedAt: '',
  })
  {
    this.id = data.id
    this.username = data.username
    this.phone = data.phone
    this.administrator = data.administrator
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}

export class EditUserData {
  constructor(data = {
    id: '',
    username: '',
    password: '',
    phone: '',
    administrator: false,
  })
  {
    this.id = data.id
    this.username = data.username
    this.password = data.password
    this.phone = data.phone
    this.administrator = data.administrator
  }
}