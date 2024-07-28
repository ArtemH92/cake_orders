<script setup>
import HeaderList from '@/components/HeaderList.vue'
import { useOrderStore } from '@/stores/orders'
import { ColumnsTable } from '@/lib/tableConfig'
import ModalWindow from '@/components/ModalWindow.vue'
import OrderAdd from '@/components/FormPopup/OrderAdd.vue'
import { ModalState, ModalValue, hendlerModal } from '@/functions/modal'
import DangerModal from '@/components/DangerModal.vue'
import { ref } from 'vue'
import StatusButton from '@/components/StatusButton.vue'
import { useAuthStore } from '@/stores/auth'
import StatusCell from './StatusCell.vue'

const { orders, getAll, remove, loading } = useOrderStore()
const { user } = useAuthStore()
getAll()

const idOrder = ref('')
const modal = (id) => {
  idOrder.value = id
  hendlerModal(true, 'remove')
}
</script>

<template>
  <a-spin :spinning="loading">
    <HeaderList @add-order="hendlerModal(true, 'addOrder')" />
    <div class="max-w-full overflow-x-auto">
      <a-table
        :columns="ColumnsTable"
        :data-source="orders"
        :scroll="{ x: true }"
        class="md:w-auto lg:w-full xl:w-full"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <a-space :compact="true" :size="['small', 'middle']">
              <a-button type="primary"> Редактировать </a-button>
              <a-button danger @click="modal(record.id)"> Удалить </a-button>
              <StatusButton :data="record" v-if="user.administrator" />
            </a-space>
          </template>
          <template v-if="column.key === 'status'">
            <StatusCell :status="record.status" />
          </template>
        </template>
      </a-table>
      <ModalWindow v-if="ModalState" :is-active="ModalState">
        <OrderAdd v-if="ModalValue === 'addOrder'" @close-modal="hendlerModal(false, '')" />
        <DangerModal
          v-if="ModalValue === 'remove'"
          @remove="
            () => {
              remove(idOrder)
              hendlerModal(false, '')
            }
          "
          @cancel="hendlerModal(false, '')"
        />
      </ModalWindow>
    </div>
  </a-spin>
</template>
