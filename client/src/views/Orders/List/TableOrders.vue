<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import CustomButton from '@/components/CustomButton.vue';
import moment from 'moment';

const props = defineProps({
  orders: Object,
})

const emit = defineEmits(['remove', 'edit', 'status'])
</script>

<template>
  <div class="bg-white rounded-md mt-6 box-border p-4">
    <DataTable :value="props.orders" sortField="date" :sortOrder="1" :paginator="orders.length > 5" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" small>
      <Column header="Изделие" class="w-1/5">
        <template #body="slotProps">
            {{ slotProps.data.dessert === 'cake' ? 'Торт' : 'Капкейк' }}
        </template>
      </Column>
  
      <Column header="Дата и время" field="date" sortable class="w-1/5">
        <template #body="slotProps">
            {{ `${moment(slotProps.data.date).format('DD-MM-YYYY')} ${moment(slotProps.data.time).format('HH:mm')}` }}
        </template>
      </Column>
  
      <Column header="Действие" class="w-2/5">
        <template #body="slotProps">
          <CustomButton label="Удалить" severity="danger" @click="emit('remove', slotProps.data)"/>
          <CustomButton label="Редактировать" class="ml-6" @click="emit('edit', slotProps.data)" />
          <CustomButton :label="slotProps.data.labelStatusBtn" v-if="slotProps.data.status != 'done'" :severity="slotProps.data.severityTag" class="ml-6" @click="emit('status', slotProps.data)" />
        </template>
      </Column>
  
      <Column header="Статус заказа" class="w-1/5">
        <template #body="slotProps">
            <Tag :value="slotProps.data.statusTag" :severity="slotProps.data.severityTag"/>
        </template>
      </Column>
    </DataTable>
  </div>
</template>