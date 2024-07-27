<script setup>
  const emit = defineEmits(['remove', 'cancel'])
</script>

<template>
  <a-card>
    <a-typography-title :level="2">
      Внимание! Заказ будет удален!
    </a-typography-title>
    <div class="flex justify-evenly mt-8">
      <a-button danger @click="emit('remove')">
        Удалить
      </a-button>
      <a-button @click="emit('cancel')">
        Отмена
      </a-button>
    </div>
  </a-card>
</template>
