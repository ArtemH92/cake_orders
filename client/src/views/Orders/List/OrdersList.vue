<script setup>
import HeaderList from '@/components/HeaderPages.vue'
import { useOrderStore } from '@/stores/orders'
import { ColumnsTableOrders } from '@/lib/tableConfig'
import ModalWindow from '@/components/ModalWindow.vue'
import { ModalState, ModalValue, hendlerModal } from '../../../functions/modal'
import DangerModal from '@/components/DangerModal.vue'
import { useAuthStore } from '@/stores/auth'
import StatusCell from './Cells/StatusCell.vue'
import { changeStatusOrder } from '@/functions/changeStatusList'
import OperationCell from './Cells/OperationCell.vue'
import { ConfirmModalConfig } from '@/lib/confirmModalConfig'
import { idOrder, statusOrder, modalRemove, modalChangeStatus } from '@/lib/modalFunction'
import { useRouter } from 'vue-router';

const router = useRouter()

const { orders, getAll, remove, loading } = useOrderStore()

const { user } = useAuthStore()

getAll()

const { removeOrder, confirm } = ConfirmModalConfig

</script>

<template>
  <a-spin :spinning="loading">
    <HeaderList 
      :url="'/orders/add'"
      :title="'Лист заказов'"
      :btn-text="'Создать заказ'"
    />
    <div class="max-w-full overflow-x-auto">
      <a-table
        :columns="ColumnsTableOrders"
        :data-source="orders"
        :scroll="{ x: true }"
        class="md:w-auto lg:w-full xl:w-full"
        :loading="loading"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <OperationCell 
              :data="record" 
              :administrator="user.administrator" 
              @click-btn="({id, status}) => modalChangeStatus(id, status)"
              @openModal="(id) => modalRemove(id, 'remove')"
              @edit="() => router.push(`/orders/edit/${record.id}`)"
            />
          </template>
          <template v-if="column.key === 'status'">
            <StatusCell :status="record.status" />
          </template>
        </template>
      </a-table>
      <ModalWindow v-if="ModalState" :is-active="ModalState">
        <DangerModal
          v-if="ModalValue === 'remove'"
          :config="removeOrder"
          @confirm="
            () => {
              remove(idOrder)
              hendlerModal(false, '')
            }
          "
          @cancel="hendlerModal(false, '')"
        />
        <DangerModal
          v-if="ModalValue === 'changeStatus'"
          :config="confirm"
          @confirm="() => {
            changeStatusOrder(idOrder, statusOrder)
            hendlerModal(false, '')
          }"
          @cancel="hendlerModal(false, '')"
        />
      </ModalWindow>
    </div>
  </a-spin>
</template>