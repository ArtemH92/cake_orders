<script setup>
import { useAuthStore } from '@/stores/auth'
import { ColumnsTableUsers } from '@/lib/tableConfig'
import HeaderList from './HeaderPages.vue'

const { getUsers, users } = useAuthStore()
getUsers()

const emit = defineEmits(['closeModal'])

</script>

<template>
  <div>
    <HeaderList 
      :title="'Список пользователей'"
      :btn-text="'Вернуться к заказам'"
      @addOrder="emit('closeModal')"
    />
    <a-table
      :columns="ColumnsTableUsers"
      :data-source="users"
      :scroll="{ x: true }"
      class="md:w-auto lg:w-full xl:w-full"
    />
  </div>
</template>

