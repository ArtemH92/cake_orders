<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Skeleton from 'primevue/skeleton';

const products = ref(new Array(5));
</script>

<template>
  <div class="bg-white rounded-md mt-6 box-border p-4">
    <DataTable :value="products"  :rows="5">
      <Column header="Изделие" class="w-1/5">
        <template #body>
          <Skeleton />
        </template>
      </Column>
  
      <Column header="Дата и время" field="date" sortable class="w-1/5">
        <template #body>
          <Skeleton />
        </template>
      </Column>
  
      <Column header="Действие" class="w-2/5">
        <template #body>
          <Skeleton />
        </template>
      </Column>
  
      <Column header="Статус заказа" class="w-1/5">
        <template #body>
          <Skeleton />
        </template>
      </Column>
    </DataTable>
  </div>
</template>