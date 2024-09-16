<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import EditUserForm from './EditUserForm.vue'
import PageTitle from '@/components/PageTitle.vue'
import SuccessModal from '@/components/modals/SuccessModal.vue'

const router = useRouter()
const modalVisible = ref(false)

const store = useAuthStore()

const modalHandler = () => {
  modalVisible.value = true
}

const success = (admin) => {
  admin ? router.push('/users/list') : router.push('/orders/list')
}
</script>

<template>
  <div>
    <PageTitle
      :url="store.user.administrator ? '/users/list' : '/orders/list'"
      :btn-label="
        store.user.administrator ? 'Вернуться к списку пользователей' : 'Вернуться к списку заказов'
      "
      title="Редактирование пользователя"
    />
    <div class="flex justify-center mt-5">
      <div class="bg-white rounded-md p-7">
        <EditUserForm
          :data="store.user"
          @finish="(data) => store.editUser(data.id, data, modalHandler)"
          @cancel="store.getUser()"
        />
      </div>
    </div>
    <SuccessModal
      v-model="modalVisible"
      @confirm="success(store.user.administrator)"
      operation="Пользователь успешно отредактирован"
    />
  </div>
</template>
