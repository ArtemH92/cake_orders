<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CreateUserForm from './CreateUserForm.vue';
import PageTitle from '@/components/PageTitle.vue';
import SuccessModal from '@/components/modals/SuccessModal.vue';
import { useAuthStore } from '@/stores/auth';

const router = useRouter()
const modalVisible = ref(false)

const { register } = useAuthStore()

const modalHandler = () => {
  modalVisible.value = true
}
</script>

<template>
  <div>
    <PageTitle url="/users/list" btn-label="Вернуться к списку пользователей" title="Создание пользователя" />
    <div class="flex justify-center mt-5">
      <div class="bg-white rounded-md p-7">
        <CreateUserForm @finish="(data) => register(data, modalHandler)"/>
      </div>
    </div>
    <SuccessModal v-model="modalVisible" @confirm="router.push('/users/list')" operation="Пользователь успешно создан" />
  </div>
</template>