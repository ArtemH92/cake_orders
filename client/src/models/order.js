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
    this.filling = data.filling != '' ? data.filling.code : ''
    this.quantity = data.quantity
    this.photos = data.photos
    this.date = data.date
    this.time = data.time
    this.status = data.status
    this.notes = data.notes
  }
}

export class AllOrders {
  constructor(data = {
    id: '',
    dessert: '',
    cakeType: '',
    cupcakesType: '',
    filling: '',
    quantity: null,
    photos: '',
    date: '',
    time: '',
    dateTime: '',
    status: '',
    notes: ''
  })
  {
    this.id = data.id
    this.dessert = data.dessert
    this.cakeType = data.cakeType
    this.cupcakesType = data.cupcakesType
    this.filling = data.filling
    this.quantity = data.quantity
    this.photos = data.photos
    this.date = data.date
    this.time = data.time
    this.statusTag = data.status === 'inProcessing' ? 'В обработке' : data.status === 'inProgress' ? 'Взяли в работу' : data.status === 'done' ? 'Заказ готов' : ''
    this.severityTag = data.status === 'inProcessing' ? 'secondary' : data.status === 'inProgress' ? 'warn' : data.status === 'done' ? 'success' : ''
    this.status = data.status
    this.labelStatusBtn = data.status === 'inProcessing' ? 'Принять в работу' : data.status === 'inProgress' ? 'Приготовить заказ' : ''
    this.notes = data.notes
  }
}

