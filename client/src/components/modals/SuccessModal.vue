<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const model = defineModel()
const emit = defineEmits(['confirm'])
const props = defineProps({
  operation: String,
  closable: Boolean
})
</script>

<template>
  <Dialog v-model:visible="model" modal :header="props.operation" :closable="false">
    <div class="flex justify-center">
      <Button label="Вернуться к списку" severity="help" @click="emit('confirm')" />
    </div>
  </Dialog>
</template>