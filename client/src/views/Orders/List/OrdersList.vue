<script setup>
import { useOrderStore } from '@/stores/orders';
import { onMounted } from 'vue';
import ListTitle from '@/components/ListTitle.vue';

const { orders, getAll } = useOrderStore()

onMounted(() => getAll())
</script>

<template>
  <div>
    <list-title url="/orders/add" btn-label="Создать заказ" title="Список заказов" />
    {{ orders }}
  </div>
</template>