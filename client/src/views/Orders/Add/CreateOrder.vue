<script setup>
import { ref } from 'vue';
import { useOrderStore } from '@/stores/orders';
import PageTitle from '@/components/PageTitle.vue';
import CreateOrderForm from './CreateOrderForm.vue';
import Toast from 'primevue/toast';
import { useRouter } from 'vue-router';
import SuccessModal from '@/components/modals/SuccessModal.vue';

const router = useRouter()
const modalVisible = ref(false)
const store = useOrderStore()
const modalHandler = () => {
  modalVisible.value = true
}
</script>

<template>
  <div>
    <PageTitle url="/orders/list" btn-label="Вернуться к списку заказов" title="Создание заказа" />
    <div class="flex justify-center mt-5">
      <div class="bg-white rounded-md p-7">
        <CreateOrderForm @finish="(data) => store.addOrder(data, modalHandler)"/>
      </div>
    </div>
    <Toast />
    <SuccessModal v-model="modalVisible" @confirm="router.push('/orders/list')" operation="Заказ успешно создан" />
  </div>
</template>