<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import EditUserForm from './EditUserForm.vue'
import PageTitle from '@/components/PageTitle.vue'
import SuccessModal from '@/components/modals/SuccessModal.vue'

const router = useRouter()
const modalVisible = ref(false)

const { user, editUser, getUser } = useAuthStore()

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
      :url="user.administrator ? '/users/list' : '/orders/list'"
      :btn-label="
        user.administrator ? 'Вернуться к списку пользователей' : 'Вернуться к списку заказов'
      "
      title="Редактирование пользователя"
    />
    <div class="flex justify-center mt-5">
      <div class="bg-white rounded-md p-7">
        <EditUserForm
          :data="user"
          @finish="(data) => editUser(data.id, data, modalHandler)"
          @cancel="getUser()"
        />
      </div>
    </div>
    <SuccessModal
      v-model="modalVisible"
      @confirm="success(user.administrator)"
      operation="Пользователь успешно отредактирован"
    />
  </div>
</template>
