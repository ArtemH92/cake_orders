<script setup>
import moment from 'moment';
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref(moment().format('DD MM YYYY HH:mm:ss'));
let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = moment().format('DD MM YYYY HH:mm:ss');
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <span class="text-white">{{ currentTime }}</span>
</template>