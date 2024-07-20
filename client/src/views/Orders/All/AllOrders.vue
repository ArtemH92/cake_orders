<script lang="ts" setup>
import HomeHeader from '@/components/HomeHeader.vue'
import { useOrderStore } from '@/stores/orders'
import type { TableColumnType } from 'ant-design-vue'
import moment from 'moment'
import { useRouter } from 'vue-router'
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined  } from '@ant-design/icons-vue';
import { h } from 'vue';

interface DataItem {
  id: string
  dessert: string
  date: string
  time: string
  notes: string
}

const showConfirm = (id: string) => {
  Modal.confirm({
    title: 'Вы уверены?',
    icon: () => h(ExclamationCircleOutlined ),
    onOk: () => removeOrder(id),
    onCancel: () => router.push('/orders/list'),
    class: 'test',
  });
}

const router = useRouter()
const { getAll, orders, removeOrder } = useOrderStore()

getAll()

const remove = (id: string) => {
  showConfirm(id)
}

const columns: TableColumnType[] = [
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
    customRender: ({ record }: { record: DataItem }) => {
      const date = moment(record.date, 'YYYY-MM-DD').format('YYYY-MM-DD')
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
]
</script>

<template>
  <HomeHeader :title="'Лист заказов'" :btn-text="'Добавить заказ'" :path="'/orders/add'" />
  <div class="max-w-full overflow-x-auto">
    <a-table
      :columns="columns"
      :data-source="orders"
      :scroll="{ x: true }"
      class="md:w-auto lg:w-full xl:w-full"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <a-space :compact="true" :size="['small', 'middle']">
            <a-button type="primary" @click="() => router.push(`/orders/edit/${record.id}`)">
              Редактировать
            </a-button>
            <a-button danger @click="() => remove(record.id)">
              Удалить
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
