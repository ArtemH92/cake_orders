<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';
import TableUsers from './TableUsers.vue';
import StubUsersList from './StubUsersList.vue';
import ProgressSpinner from 'primevue/progressspinner';
import Toast from 'primevue/toast';
import { ref } from 'vue';

onMounted(() => store.getUsers())

const store = useAuthStore()

const modalVisible = ref(false)
const userId = ref('')

const confirmModalHandler = () => {
  store.removeUser(userId.value)
  modalVisible.value = false
}
</script>

<template>
  <div>
    <div v-if="store.loading">
      <ProgressSpinner />
    </div>
    <div v-else>
      <div v-if="store.user.administrator">
        <TableUsers 
          :users="store.users" 
          @remove="(id) => {
            userId = id
            modalVisible = true
          }"
          />
      </div>
      <div v-else><StubUsersList /></div>
    </div>
    <ConfirmModal v-model="modalVisible" @confirm="confirmModalHandler" @cancel="modalVisible = false"/>
    <Toast />
  </div>
</template>