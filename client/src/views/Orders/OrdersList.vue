<script setup>
import HeaderList from '@/components/HeaderList.vue'
import { useOrderStore } from '@/stores/orders'
import { ColumnsTableOrders } from '@/lib/tableConfig'
import ModalWindow from '@/components/ModalWindow.vue'
import OrderAdd from '@/components/FormPopup/OrderAdd.vue'
import { ModalState, ModalValue, hendlerModal } from '../../functions/modal'
import DangerModal from '@/components/DangerModal.vue'
import { useAuthStore } from '@/stores/auth'
import StatusCell from './Cells/StatusCell.vue'
import { changeStatusOrder } from '@/functions/changeStatusList'
import OperationCell from './Cells/OperationCell.vue'
import { ConfirmModalConfig } from '@/lib/confirmModalConfig'
import EditOrder from '@/components/FormPopup/EditOrder.vue'
import { idOrder, statusOrder, modalRemove, modalChangeStatus, modalEdit } from '@/lib/modalFunction'

const { orders, getAll, remove, loading } = useOrderStore()

const { user } = useAuthStore()

getAll()

const { removeOrder, confirm } = ConfirmModalConfig

</script>

<template>
  <a-spin :spinning="loading">
    <HeaderList 
      @add-order="hendlerModal(true, 'addOrder')" 
      :title="'Лист заказов'"
      :btn-text="'Создать заказ'"
    />
    <div class="max-w-full overflow-x-auto">
      <a-table
        :columns="ColumnsTableOrders"
        :data-source="orders"
        :scroll="{ x: true }"
        class="md:w-auto lg:w-full xl:w-full"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <OperationCell 
              :data="record" 
              :administrator="user.administrator" 
              @click-btn="({id, status}) => modalChangeStatus(id, status)"
              @openModal="(id) => modalRemove(id, 'remove')"
              @edit="(id) => modalEdit(id, 'edit')"
            />
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
        <EditOrder 
          v-if="ModalValue === 'edit' && !loading"
          @close-modal="hendlerModal(false, '')"
        />
      </ModalWindow>
    </div>
  </a-spin>
</template>
