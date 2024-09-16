<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import CurrentTime from './CurrentTime.vue';
import DropDown from './DropdownMenu/DropDown.vue';

const store = useAuthStore()
onMounted(() => store.getUser())
</script>

<template>
  <header class="fixed w-full z-10 shadow-md p-4 flex justify-between items-center bg-fuchsia-700" >
    <CurrentTime />
    <DropDown />
  </header>
</template>