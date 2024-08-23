<script setup>
import { useOrderStore } from '@/stores/orders'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PageTitle from '@/components/PageTitle.vue'
import EditOrderForm from './EditOrderForm.vue'
import SuccessModal from '@/components/modals/SuccessModal.vue'
import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner'

onMounted(() => getOrder(route.params.id))
const { order, getOrder, editOrder, loading } = useOrderStore()

const router = useRouter()
const route = useRoute()

const modalVisible = ref(false)
const modalHandler = () => {
  modalVisible.value = true
}
</script>

<template>
  <div>
    <PageTitle
      url="/orders/list"
      btn-label="Вернуться к списку заказов"
      title="Редактирование заказа"
    />
    <div class="flex justify-center mt-5">
      <div class="bg-white rounded-md p-7" v-if="loading">
        <ProgressSpinner />
      </div>
      <EditOrderForm
        v-else
        :data="order"
        @finish="(data) => editOrder(data.id, data, modalHandler)"
        @cancel="getOrder(route.params.id)"
      />
    </div>
    <Toast />
    <SuccessModal
      v-model="modalVisible"
      @confirm="router.push('/orders/list')"
      operation="Заказ успешно обновлен"
      :closable="true"
    />
  </div>
</template>
