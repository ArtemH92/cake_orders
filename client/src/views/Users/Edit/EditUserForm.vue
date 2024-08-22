<script setup>
import { reactive, ref } from 'vue';
import { EditUserData } from '@/models/users';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import CustomButton from '@/components/CustomButton.vue';
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

      <!-- <FloatLabel class="mt-6">
        <Password v-model="userData.password" :feedback="false" />
        <label>Пароль</label>
      </FloatLabel> 

      <FloatLabel class="mt-6">
        <Password v-model="userData.confirmPassword" :feedback="false" />
        <label>Повторите пароль</label>
      </FloatLabel>  -->

      <FloatLabel class="mt-6">
        <InputText v-model="userData.phone" v-maska data-maska="+375 (##) ### ## ##" :disabled="disabled" />
        <label>Номер телефона</label>
      </FloatLabel> 

      <div class="mt-6 flex justify-center">
        <CustomButton label="Редактировать" @click="disabled = false" v-if="disabled" />
        <div v-else class="flex justify-between w-full">
          <CustomButton label="Сохранить" type="submit" />
          <CustomButton label="Отмена" @click="cancelEdit()" />
        </div>
      </div>
    </form>
  </div>
</template>