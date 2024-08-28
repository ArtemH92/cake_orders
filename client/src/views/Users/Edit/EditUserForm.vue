<script setup>
import { reactive, ref } from 'vue';
import CustomButton from '@/components/CustomButton.vue';
import CustomInputText from '@/components/FormFields/CustomInputText.vue'
import CustomInputMask from '@/components/FormFields/CustomInputMask.vue'
import CustomInputPassword from '@/components/FormFields/CustomInputPassword.vue'

const emit = defineEmits(['finish', 'cancel'])
const props = defineProps({
  data: Object
})
const userData = reactive(props.data)

const disabled = ref(true)
const finish = () => {
  emit('finish', userData)
}
const cancelEdit = () => {
  disabled.value = true
  emit('cancel')
}

const changePassword = {
  password: '',
  confirmPassword: ''
}
</script>

<template>
  <div>
    <form autocomplete="off" @submit.prevent="finish()">
      <CustomInputText 
        v-model="userData.username"
        :disabled="disabled"
        label="Имя пользователя"
      />

      <CustomInputMask 
        class="mt-6"
        v-model="userData.phone"
        label="Номер телефона"
        maska="+375 (##) ### ## ##"
        :disabled="disabled"
      />
      
      <CustomInputPassword 
        class="mt-6"
        v-model="changePassword.password"
        label="Пароль"
        :disabled="disabled"
      />

      <CustomInputPassword 
        class="mt-6"
        v-model="changePassword.confirmPassword"
        label="Повторите пароль"
        :disabled="disabled"
      />

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