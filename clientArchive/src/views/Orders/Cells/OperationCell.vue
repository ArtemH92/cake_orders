<script setup>
import StatusButton from '@/components/StatusButton.vue'

const props = defineProps({
  data: Object,
  administrator: Boolean
})

const emit = defineEmits(['click-btn', 'openModal', 'edit'])
</script>

<template>
  <a-space :compact="true" :size="['small', 'middle']">
    <a-button 
      type="primary" 
      :disabled="props.administrator === false ? true : props.data.status != 'isProcessing' ? false : true"
      @click="emit('edit', props.data.id)"
    >
      Редактировать
    </a-button>
    <a-button danger @click="emit('openModal', props.data.id)"> Удалить </a-button>
    <StatusButton
      :data="props.data"
      v-if="props.administrator && props.data.status != 'done'"
      @click-btn="emit('click-btn', {id: props.data.id, status: props.data.status})"
    />
  </a-space>
</template>
