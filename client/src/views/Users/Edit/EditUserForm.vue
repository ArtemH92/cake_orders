<script setup>
import { reactive, ref } from 'vue';
import { EditUserData } from '@/models/users';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { vMaska } from 'maska'

const emit = defineEmits(['finish', 'cancel'])
const props = defineProps({
  data: Object
})
const userData = reactive(props.data)

const disabled = ref(true)
const cancelEdit = () => {
  disabled.value = true
  emit('cancel')
}
</script>

<template>
  <div>
    <form autocomplete="off" @submit.prevent="emit('finish', new EditUserData(userData))">
      <FloatLabel>
        <InputText v-model="userData.username" :disabled="disabled"/>
        <label>Имя пользователя</label>
      </FloatLabel> 

      <FloatLabel class="mt-6">
        <InputText v-model="userData.phone" v-maska data-maska="+375 (##) ### ## ##" :disabled="disabled" />
        <label>Номер телефона</label>
      </FloatLabel> 

      <div class="mt-6 flex justify-center">
        <Button label="Редактировать" @click="disabled = false" v-if="disabled" />
        <div v-else class="flex justify-between w-full">
          <Button label="Сохранить" type="submit" />
          <Button label="Отмена" @click="cancelEdit()" />
        </div>
      </div>
    </form>
  </div>
</template>