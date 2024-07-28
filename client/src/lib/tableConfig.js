import moment from 'moment'

export const ColumnsTable = [
  {
    title: 'Изделие',
    dataIndex: 'dessert',
    customRender: ({ record }) => {
      const dessert = record.dessert == 'cake' ? 'Торт' : 'Капкейк'
      return dessert
    }
  },
  {
    title: 'Дата и время',
    key: 'dateTime',
    customRender: ({ record }) => {
      const date = moment(record.date, 'DD-MM-YYYY').format('DD-MM-YYYY')
      const time = moment(new Date(record.time)).format('HH:mm')
      return `${date} ${time}`
    }
  },
  {
    title: 'Примечания',
    dataIndex: 'notes',
    key: 'notes'
  },
  {
    title: 'Действие',
    key: 'operation'
  },
  {
    title: 'Статус заказа',
    key: 'status',
  }
]
