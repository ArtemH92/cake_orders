<script setup>
import DataTable from 'primevue/datatable';
import PageTitle from '@/components/PageTitle.vue';
import Column from 'primevue/column';
import GoogleIcon from '@/components/GoogleIcon.vue';
import Button from 'primevue/button';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
  users: Object
})

const emit = defineEmits(['remove'])

const store = useAuthStore()
</script>

<template>
  <div class="bg-white rounded-md mt-6 box-border p-4">
    <DataTable :value="props.users" size="small">
      <template #header>
        <PageTitle url="/users/add" btn-label="Создать пользователя" title="Список пользователей" mWidth="max-w-full"
          colorTitle="text-black" />
      </template>

      <Column header="Имя" class="w-1/4">
        <template #body="{ data }">
          {{ data.username }}
        </template>
      </Column>

      <Column header="Номер телефона" class="w-1/4">
        <template #body="{ data }">
          {{ data.phone === null ? '--/--' : data.phone }}
        </template>
      </Column>

      <Column header="Администратор" class="w-1/4">
        <template #body="{ data }">
          <GoogleIcon icon="done" v-if="data.administrator" color="text-green-600" />
          <GoogleIcon icon="cancel_presentation" v-else color="text-red-600" />
        </template>
      </Column>

      <Column header="Действие" class="w-1/4">
        <template #body="{ data }">
          <Button label="Удалить" severity="danger" @click="emit('remove', data.id)" :disabled="data.administrator && data.id === store.user.id" />
        </template>
      </Column>

    </DataTable>
  </div>
</template>