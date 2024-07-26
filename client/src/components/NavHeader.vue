<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import moment from 'moment';
import { useAuthStore } from '@/stores/auth';
import ModalWindow from './ModalWindow.vue';
import CreateUser from './FormPopup/CreateUser.vue';
import EditUser from './FormPopup/EditUser.vue';
import DropDownMenu from './DropDownMenu.vue';

const { user, getUser } = useAuthStore()
let openModal = ref(false)
let modal = ref('')

const handleModal = (modalState, modalName) => {
  openModal.value = modalState
  modal.value = modalName
}

getUser()

const currentTime = ref(moment().format('YYYY-MM-DD HH:mm:ss'));
let timer = null;

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
      <DropDownMenu 
        :administrator="user?.administrator"
        @created-user="handleModal(true, 'createUser')"
        @edit-user="handleModal(true, 'editUser')"
      />
      <ModalWindow v-if="openModal" :is-active="openModal">
        <CreateUser @close-modal="handleModal(false, '')" v-if="modal === 'createUser'" />
        <EditUser v-if="modal === 'editUser'" @close-modal="handleModal(false, '')" />
      </ModalWindow>
    </div>
  </a-layout-header>
</template>