<script setup>
import Dialog from 'primevue/dialog';
import CustomButton from './CustomButton.vue';

const emit = defineEmits(['cancel', 'confirm'])
const model = defineModel()
</script>

<template>
  <Dialog v-model:visible="model" modal header="Вы уверены?">
    <div class="flex justify-evenly">
      <CustomButton severity="danger" label="Да" @click="emit('confirm')" />
      <CustomButton label="Нет" @click="emit('cancel')" />
    </div>
  </Dialog>
</template>