export class CreateOrderData {
  constructor(data = {
    dessert: '',
    cakeType: '',
    cupcakesType: '',
    filling: '',
    quantity: null,
    photo: '',
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
    this.photo = data.photo
    this.date = data.date
    this.time = data.time
    this.status = data.status
    this.notes = data.notes
  }
}

export class SendCreateOrderData {
  constructor(data = {
    dessert: '',
    cakeType: '',
    cupcakesType: '',
    filling: '',
    quantity: null,
    photos: '',
    date: '',
    time: '',
    status: '',
    notes: ''
  })
  {
    this.dessert = data.dessert != '' ? data.dessert.code : ''
    this.cakeType = data.cakeType != '' ? data.cakeType.code : ''
    this.cupcakesType = data.cupcakesType != '' ? data.cupcakesType.code : ''
    this.filling = data.filling
    this.quantity = data.quantity
    this.photos = data.photos
    this.date = data.date
    this.time = data.time
    this.status = data.status
    this.notes = data.notes
  }
}

