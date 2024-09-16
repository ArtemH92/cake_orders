<script setup>
import { useOrderStore } from '@/stores/orders'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PageTitle from '@/components/PageTitle.vue'
import EditOrderForm from './EditOrderForm.vue'
import SuccessModal from '@/components/modals/SuccessModal.vue'
import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner'

onMounted(() => store.getOrder(route.params.id))
// const { order, getOrder, editOrder, loading } = useOrderStore()
const store = useOrderStore()
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
      <div class="bg-white rounded-md p-7">
        <ProgressSpinner v-if="store.loading" />
        <EditOrderForm
          v-else
          :data="store.order"
          @finish="(data) => store.editOrder(data.id, data, modalHandler)"
          @cancel="store.getOrder(route.params.id)"
        />
      </div>
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
