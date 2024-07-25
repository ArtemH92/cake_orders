<script setup lang="ts">
import { ref, onMounted, onUnmounted, h } from 'vue';
import moment from 'moment';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { UserOutlined, EditOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons-vue';


const router = useRouter()
const { logout, user, getUser } = useAuthStore()

getUser()

const hendleLogout = () => {
  logout()
  router.push('/login')
}

const currentTime = ref(moment().format('YYYY-MM-DD HH:mm:ss'));
let timer: number;

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = moment().format('YYYY-MM-DD HH:mm:ss');
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

</script>

<template>
  <a-layout-header class="fixed w-full z-10 shadow-md px-4 flex justify-between items-center !bg-fuchsia-700">
    <a-typography-text class="text-white">Cake orders</a-typography-text>
    <a-typography-text class="text-white">{{ currentTime }}</a-typography-text>
    <div class="flex items-center justify-center">
      <div class="pr-2 text-white">{{ user?.username }}</div>
      <a-dropdown :arrow="{ pointAtCenter: true }" type="primary">
        <a-button type="primary" :icon="h(UserOutlined)" class="flex items-center justify-center" />
        <template #overlay>
          <a-menu>
            <a-menu-item v-if="user?.administrator">
              <span class="flex justify-start items-center">
                <UserAddOutlined class="pr-2" /> Добавить нового пользователя
              </span>
            </a-menu-item>
            <a-menu-item>
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
    </div>
  </a-layout-header>
</template>