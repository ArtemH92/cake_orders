<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import TableUsers from './TableUsers.vue';

onMounted(() => getUsers())

const { users, user, loading, getUsers } = useAuthStore()
</script>

<template>
  <div>
    <div v-if="loading">
      LOADING...
    </div>
    <div v-else>
      <div v-if="user.administrator">
        <TableUsers
          :users="users"
        />
      </div>
      <div v-else>Googbye</div>
    </div>
  </div>
</template>