<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import TableUsers from './TableUsers.vue';
import StubUsersList from './StubUsersList.vue';
import ProgressSpinner from 'primevue/progressspinner';

onMounted(() => getUsers())

const { users, user, loading, getUsers } = useAuthStore()
</script>

<template>
  <div>
    <div v-if="loading">
      <ProgressSpinner />
    </div>
    <div v-else>
      <div v-if="user.administrator">
        <TableUsers :users="users"/>
      </div>
      <div v-else><StubUsersList /></div>
    </div>
  </div>
</template>