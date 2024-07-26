export class CreateOrder {
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
  }
}