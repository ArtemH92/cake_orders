import moment from "moment"

export class CreateOrder {
  constructor(data = {
    dessert: '',
    cakeType: '',
    cupcakesType: '',
    filling: '',
    quantity: null,
    photos: [],
    date: '',
    time: '',
    status: '',
    notes: ''
  })
  {
    this.dessert = data.dessert
    this.cakeType = data.cakeType
    this.cupcakesType = data.cupcakesType
    this.filling = data.filling
    this.quantity = data.quantity
    this.photos = data.photos
    this.date = data.date
    this.time = data.time
    this.status = data.status
  }
}

export class EditOrderData {
  constructor(data = {
    id: '',
    dessert: '',
    cakeType: '',
    cupcakesType: '',
    filling: '',
    quantity: null,
    photos: [],
    date: '',
    time: '',
    status: '',
    notes: '',
    createdAt: '',
    updatedAt: '',
    createdById: '',
    lastEditedById: null,

  })
  {
    this.id = data.id
    this.dessert = data.dessert
    this.cakeType = data.cakeType
    this.cupcakesType = data.cupcakesType
    this.filling = data.filling
    this.quantity = data.quantity
    this.photos = data.photos
    this.date = moment(data.date)
    this.time = moment(data.time)
    this.status = data.status
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.createdById = data.createdById
    this.lastEditedById = data.lastEditedById
  }
}