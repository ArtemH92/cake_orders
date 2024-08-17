<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from "@/stores/auth";
import Menu from 'primevue/menu';
import Button from 'primevue/button';
import ConfirmModal from '../ConfirmModal.vue';
import GoogleIcon from '../GoogleIcon.vue';

const { logout, user } = useAuthStore()

const items = computed(() => ([
  ...(user.administrator ? [
    {
      label: 'Список пользователей'
    },
    {
      label: 'Добавить нового пользователя'
    }
  ] : []),
  {
    label: 'Редактировать пользователя'
  },
  {
    label: 'Выйти',
    command: () => confirmModalVisible.value = true
  },
]));
const menu = ref();
const confirmModalVisible = ref(false)

const toggle = (event) => {
    menu.value.toggle(event);
};
</script>

<template>
  <div class="flex items-center">
    <span class="text-white pr-2">{{ user.username }}</span>
    <Button severity="help" type="button" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" size="small" rounded>
      <GoogleIcon icon="account_circle" />
    </Button>
    <Menu ref="menu" id="overlay_menu" :popup="true" :model="items"></Menu>
    <ConfirmModal v-model="confirmModalVisible" @confirm="logout()" @cancel="confirmModalVisible = false"/>
  </div>
</template>