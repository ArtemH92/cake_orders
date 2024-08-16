<script setup>
const props = defineProps({
  data: Object
})
const emit = defineEmits(['clickBtn'])
</script>

<template>
  <a-button 
    @click="emit('clickBtn')"
    :class="props.data.status === 'inProcessing' ? '!bg-slate-300' : props.data.status === 'inProgress' ? '!bg-green-600' : ''"
  >
    {{ 
      props.data.status === 'inProcessing' ? 'Принять в работу' : props.data.status === 'inProgress' ? 'Заказ готов' : ''
    }}
  </a-button>
</template>

