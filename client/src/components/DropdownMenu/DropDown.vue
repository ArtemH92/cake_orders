<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Menu from 'primevue/menu'
import Button from 'primevue/button'
import ConfirmModal from '../modals/ConfirmModal.vue'
import { useRouter } from 'vue-router'

const store = useAuthStore()
const router = useRouter()

const items = computed(() => [
  ...(store.user.administrator
    ? [
        {
          label: 'Список пользователей',
          command: () => router.push('/users/list')
        },
        {
          label: 'Добавить нового пользователя',
          command: () => router.push('/users/add')
        }
      ]
    : []),
  {
    label: 'Редактировать пользователя',
    command: () => router.push(`/users/edit/${store.user.id}`)
  },
  {
    label: 'Список заказов',
    command: () => router.push('/orders/list')
  },
  {
    label: 'Выйти',
    command: () => (confirmModalVisible.value = true)
  }
])
const menu = ref()
const confirmModalVisible = ref(false)

const toggle = (event) => {
  menu.value.toggle(event)
}
</script>

<template>
  <div class="flex items-center">
    <span class="text-white pr-2">{{ store.user.username }}</span>
    <Button
      severity="help"
      type="button"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      size="small"
      icon="pi pi-user"
    />
    <Menu ref="menu" id="overlay_menu" :popup="true" :model="items"></Menu>
    <ConfirmModal
      v-model="confirmModalVisible"
      @confirm="store.logout()"
      @cancel="confirmModalVisible = false"
    />
  </div>
</template>
