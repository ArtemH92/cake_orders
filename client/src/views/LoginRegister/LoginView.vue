<template>
  <a-card class="w-full max-w-[500px] sm:max-w-[375px] md:max-w-[500px]">
  <a-form
    ref="formRef"
    name="login_form"
    autocomplete="off"
    :model="formState"
    :rules="RulesLogin"
    v-bind="LayoutLogin"
    @finish="handleFinish"
    @validate="handleValidate"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item label="Имя пользователя" name="username">
      <a-input v-model:value="formState.username" type="text"  />
    </a-form-item>
    <a-form-item label="Пароль" name="password">
      <a-input-password v-model:value="formState.password" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</a-card>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { RulesLogin, LayoutLogin } from './configLoginForm';

interface FormState {
  username: string;
  password: string;
}
const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
  username: '',
  password: '',
});

const handleFinish = (values: FormState) => {
  console.log(values, formState);
};
const handleFinishFailed = (errors: any) => {
  console.log(errors);
};

const handleValidate = (...args: any) => {
  console.log(args);
};
</script>