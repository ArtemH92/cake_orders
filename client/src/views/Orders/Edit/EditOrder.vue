<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ListTitle from '@/components/ListTitle.vue';
import EditOrderForm from './EditOrderForm.vue';
import { useOrderStore } from '@/stores/orders';
import SuccessModal from '@/components/modals/SuccessModal.vue';
import Toast from 'primevue/toast';

const router = useRouter()
const { editOrder } = useOrderStore()

const modalVisible = ref(false)
const modalHandler = () => {
  modalVisible.value = true
}
</script>

<template>
  <div>
    <list-title url="/orders/list" btn-label="Вернуться к списку заказов" title="Редактирование заказа" />
    <div class="flex justify-center mt-5">
      <EditOrderForm @finish="(data) => editOrder(data.id, data, modalHandler)" />
    </div>
    <Toast />
    <SuccessModal v-model="modalVisible" @confirm="router.push('/orders/list')" operation="Заказ успешно обновлен" :closable="true" />
  </div>
</template>

