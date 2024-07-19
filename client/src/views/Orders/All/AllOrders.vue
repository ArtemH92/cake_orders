<script lang="ts" setup>
import HomeHeader from '@/components/HomeHeader.vue'; 
import { useOrderStore } from '@/stores/orders';
import moment from 'moment'

interface OrderDisplay {
  id: string
  dessert: string
  date: string
  time: string
  notes: string
}

const { getAllOrders, orders } = useOrderStore()

getAllOrders()

const columns = [
  {
    title: 'Изделие',
    key: 'dessert',
    customRender: ({ record }: { record: OrderDisplay }) => {
      const item = record.dessert === 'cake' ? 'Торт' : 'Капкейк';
      return item;
    },
  },
  {
    title: 'Дата и время',
    key: 'dateTime',
    customRender: ({ record }: { record: OrderDisplay }) => {
      const dateTime = moment(record.date).format('DD.MM.YYYY') + ' ' + record.time;
      return dateTime;
    },
  },
  {
    title: 'Примечание',
    dataIndex: 'notes',
    key: 'notes',
  },
]
</script>

<template>
  <HomeHeader 
      :title="'Лист заказов'"
      :btn-text="'Добавить заказ'"
      :path="'/orders/add'" />
  <a-table :columns="columns" :data-source="orders" rowKey="id" bordered />
</template>