<script setup>
import DataTable from 'primevue/datatable';
import PageTitle from '@/components/PageTitle.vue';
import Column from 'primevue/column';
import GoogleIcon from '@/components/GoogleIcon.vue';
const props = defineProps({
  users: Object
})
</script>

<template>
  <div class="bg-white rounded-md mt-6 box-border p-4">
    <DataTable :value="props.users" size="small">
      <template #header>
        <PageTitle 
          url="/users/add" 
          btn-label="Создать пользователя" 
          title="Список пользователей" 
          mWidth="max-w-full"
          colorTitle="text-black"
        />
      </template>

      <Column header="Имя" class="w-1/4">
        <template #body="slotProps">
          {{ slotProps.data.username }}
        </template>
      </Column>

      <Column header="Номер телефона" class="w-1/4">
        <template #body="slotProps">
          {{ slotProps.data.phone === null ? '--/--' : slotProps.data.phone }}
        </template>
      </Column>

      <Column header="Администратор" class="w-1/4">
        <template #body="slotProps">
          <GoogleIcon icon="done" v-if="slotProps.data.administrator" color="text-green-600" />
          <GoogleIcon icon="cancel_presentation" v-else color="text-red-600" />
        </template>
      </Column>

    </DataTable>
  </div>
</template>