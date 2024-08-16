<script setup>
import { ref, reactive } from 'vue'
import { EditUser } from '@/models/users/user.module';
import { useAuthStore } from '@/stores/auth';
import { FormLayout } from '@/lib/Form/formConfig'
import { message } from 'ant-design-vue';
import { vMaska } from 'maska'

const formRef = ref()
const disabled = ref(true)
const emit = defineEmits(['closeModal'])
const { user, editUser } = useAuthStore()

let userData = reactive(new EditUser(user))

const handleFinish = (values) => {
  editUser(user.id, values).then(() => {
    message.success('Пользователь успешно изменен')
    emit('closeModal')
  })
}
</script>

<template>
  <a-card class="w-full max-w-[500px] sm:max-w-[375px] md:max-w-[500px]">
    <a-typography-title class="text-center !text-[clamp(2rem,0.8rem+2vw,2.5rem)]">
      Редактирование пользователя
    </a-typography-title>
    <a-typography-text class="flex justify-end" v-if="disabled">
      
    </a-typography-text>
    <a-form 
      ref="formRef" 
      name="edit_form" 
      autocomplete="off" 
      class="mt-8"
      :model="userData"
      v-bind="FormLayout"
      @finish="handleFinish(userData)"
    >
      <a-form-item label="Имя пользователя" name="username">
        <a-input type="text" :disabled="disabled" v-model:value="userData.username"/>
      </a-form-item>

      <a-form-item label="Номер телефона" name="phone">
        <a-input
          v-model:value="userData.phone"
          type="text"
          v-maska
          data-maska="+375 (##) ### ## ##"
          :disabled="disabled"
        />
      </a-form-item>

      <div class="flex justify-evenly flex-wrap">
        <a-button type="primary" html-type="submit" v-show="!disabled">Созранить</a-button>
        <a-button @click="disabled = false" v-show="disabled">Редактировать</a-button>
        <a-button @click="emit('closeModal')">Отмена</a-button>
      </div>

    </a-form>
  </a-card>
</template>