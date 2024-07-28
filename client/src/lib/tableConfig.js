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
      const day = moment(record.date, 'YYYY-MM-DD').format('DD')
      const month = moment(record.date, 'YYYY-MM-DD').format('MM')
      const year = moment(record.date, 'YYYY-MM-DD').format('YYYY')
      const time = moment(new Date(record.time)).format('HH:mm')
      return `${day}-${month}-${year} ${time}`
    }
  },
  {
    title: 'Примечания',
    dataIndex: 'notes',
    key: 'notes',
    customRender: ({record}) => {
      const notes = record.notes === '' || record.notes === null ? '-' : record.notes
      return notes
    }
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
