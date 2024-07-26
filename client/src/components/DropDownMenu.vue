<script setup>
import { h } from 'vue';
import { UserOutlined, EditOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const props = defineProps({
  administrator: Boolean
})
const emit = defineEmits(['createdUser', 'editUser'])
const router = useRouter()
const { logout } = useAuthStore()

const hendleLogout = () => {
  logout()
  router.push('/login')
}

</script>

<template>
  <a-dropdown :arrow="{ pointAtCenter: true }" type="primary" :trigger="['click']">
    <a-button type="primary" :icon="h(UserOutlined)" class="flex items-center justify-center" />
    <template #overlay>
      <a-menu>
        <a-menu-item v-if="props.administrator" @click="emit('createdUser')">
          <span class="flex justify-start items-center">
            <UserAddOutlined class="pr-2" /> Добавить нового пользователя
          </span>
        </a-menu-item>
        <a-menu-item @click="emit('editUser')">
          <span class="flex justify-start items-center">
            <EditOutlined class="pr-2" /> Редактировать пользователя
          </span>
        </a-menu-item>
        <a-menu-item @click="hendleLogout()">
          <span class="flex justify-start items-center">
            <LogoutOutlined class="pr-2" /> Выйти
          </span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>