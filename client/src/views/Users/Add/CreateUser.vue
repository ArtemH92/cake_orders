<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import CreateUserForm from './CreateUserForm.vue'
import PageTitle from '@/components/PageTitle.vue'
import SuccessModal from '@/components/modals/SuccessModal.vue'
import StubUsersList from '../List/StubUsersList.vue'

const router = useRouter()
const modalVisible = ref(false)

const store = useAuthStore()

const modalHandler = () => {
  modalVisible.value = true
}
</script>

<template>
  <div>
    <div v-if="store.user.administrator">
      <PageTitle
        url="/users/list"
        btn-label="Вернуться к списку пользователей"
        title="Создание пользователя"
      />
      <div class="flex justify-center mt-5">
        <div class="bg-white rounded-md p-7">
          <CreateUserForm @finish="(data) => store.register(data, modalHandler)" />
        </div>
      </div>
      <SuccessModal
        v-model="modalVisible"
        @confirm="router.push('/users/list')"
        operation="Пользователь успешно создан"
      />
    </div>
    <div v-else><StubUsersList /></div>
  </div>
</template>
