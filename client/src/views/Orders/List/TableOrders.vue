<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import CustomButton from '@/components/CustomButton.vue'
import moment from 'moment'
import PageTitle from '@/components/PageTitle.vue'

const props = defineProps({
  orders: Object
})

const emit = defineEmits(['remove', 'edit', 'status'])
</script>

<template>
  <div class="bg-white rounded-md mt-6 box-border p-4">
    <DataTable
      :value="props.orders"
      sortField="dateTime"
      :sortOrder="1"
      :paginator="orders.length > 5"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      size="small"
    >
      <template #header>
        <PageTitle
          url="/orders/add"
          btn-label="Создать заказ"
          title="Список заказов"
          mWidth="max-w-full"
          colorTitle="text-black"
        />
      </template>
      <Column header="Изделие" class="w-1/5">
        <template #body="slotProps">
          {{ slotProps.data.dessert === 'cake' ? 'Торт' : 'Капкейк' }}
        </template>
      </Column>

      <Column header="Дата и время" field="dateTime" sortable class="w-1/5">
        <template #body="slotProps">
          {{ moment(slotProps.data.dateTime).format('DD-MM-YYYY HH:mm') }}
        </template>
      </Column>

      <Column header="Действие" class="w-2/5">
        <template #body="slotProps">
          <div class="flex flex-wrap gap-2">
            <CustomButton
              label="Удалить"
              severity="danger"
              @click="emit('remove', slotProps.data)"
              size="small"
            />
            <CustomButton
              label="Редактировать"
              @click="emit('edit', slotProps.data)"
              size="small"
            />
            <CustomButton
              :label="slotProps.data.labelStatusBtn"
              v-if="slotProps.data.status != 'done'"
              :severity="slotProps.data.severityTag"
              @click="emit('status', slotProps.data)"
              size="small"
            />
          </div>
        </template>
      </Column>

      <Column header="Статус заказа" class="w-1/5">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.statusTag"
            :severity="slotProps.data.severityTag"
            :icon="slotProps.data.severityTag === 'secondary' ? 'pi pi-spin pi-spinner' : ''"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>