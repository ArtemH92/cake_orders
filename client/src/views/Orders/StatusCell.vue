<script setup>
import { ClockCircleOutlined, SyncOutlined, CheckCircleOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  status: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <a-space :compact="true" :size="['small', 'middle']">
    <a-tag
      :color="
        props.status === 'inProcessing'
          ? 'default'
          : props.status === 'inProgress'
            ? 'processing'
            : props.status === 'done'
              ? 'success'
              : ''
      "
      class="flex items-center"
    >
      <template #icon>
        <clock-circle-outlined v-show="props.status === 'inProcessing'" />
        <sync-outlined :spin="true" v-show="props.status === 'inProgress'" />
        <check-circle-outlined v-show="props.status === 'done'" />
      </template>
      {{
        props.status === 'inProcessing'
          ? 'Заказ в обработке'
          : props.status === 'inProgress'
            ? 'Заказ принят'
            : props.status === 'done'
              ? 'Заказ готов'
              : ''
      }}
    </a-tag>
  </a-space>
</template>
