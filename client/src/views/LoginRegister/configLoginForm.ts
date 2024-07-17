import type { Rule } from 'ant-design-vue/es/form';

//validations
const validateUsername = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Введите имя пользователя');
  } 
  return Promise.resolve(); 
};

const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Введите пароль');
  }
  return Promise.resolve(); 
};

//rules
export const RulesLogin: Record<string, Rule[]> = {
  username: [{ required: true, validator: validateUsername, trigger: 'change' }],
  password: [{ required: true, validator: validatePass, trigger: 'change' }],
};

//layout
export const LayoutLogin = {
  labelCol: { span: 24, sm: 8 },
  wrapperCol: { span: 24, sm: 16 },
};