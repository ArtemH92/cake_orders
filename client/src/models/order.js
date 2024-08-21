import moment from "moment"

export class CreateOrderData {
  constructor(data = {
    dessert: '',
    cakeType: '',
    cupcakesType: '',
    filling: '',
    quantity: null,
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
    this.date = data.date
    this.time = data.time
    this.statusTag = data.status === 'inProcessing' ? 'В обработке' : data.status === 'inProgress' ? 'Взяли в работу' : data.status === 'done' ? 'Заказ готов' : ''
    this.severityTag = data.status === 'inProcessing' ? 'secondary' : data.status === 'inProgress' ? 'warn' : data.status === 'done' ? 'success' : ''
    this.status = data.status
    this.labelStatusBtn = data.status === 'inProcessing' ? 'Принять в работу' : data.status === 'inProgress' ? 'Приготовить заказ' : ''
    this.notes = data.notes
  }
}

export class SingleOrder {
  constructor(data = {
    id: '',
    dessert: '',
    cakeType: '',
    cupcakesType: '',
    filling: '',
    quantity: null,
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
    this.quantity = +data.quantity
    this.date = new Date(data.date)
    this.time = new Date(data.time)
    this.status = data.status
    this.notes = data.notes
  }
}

