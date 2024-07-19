import { validateUsername, requiredField, validatePass2 } from './validation'
import type { Rule } from 'ant-design-vue/es/form';

//rules 

export const RulesLogin: Record<string, Rule[]> = {
  username: [{ required: true, validator: validateUsername, trigger: 'change' }],
  password: [{ required: true, validator: requiredField, trigger: 'change' }],
};

export const RulesRegister = (password: string): Record<string, Rule[]> => ({
  username: [{ required: true, validator: validateUsername, trigger: 'change' }],
  password: [{ required: true, validator: requiredField, trigger: 'change' }],
  confirmPassword: [{ required: true, validator: validatePass2(password), trigger: 'change' }]
});

export const RulesAddOrder: Record<string | number | symbol, Rule[]> = {
  dessert: [{ required: true, validator: requiredField, trigger: 'change' }],
  cakeType: [{ required: true, validator: requiredField, trigger: 'change' }],
  cupcakesType: [{ required: true, validator: requiredField, trigger: 'change' }],
  filling: [{ required: true, validator: requiredField, trigger: 'change' }],
  quantity: [{ required: true, validator: requiredField, trigger: 'change' }],
  date: [{ required: true, validator: requiredField, trigger: 'change' }],
  time: [{ required: true, validator: requiredField, trigger: 'change' }],
}

//layout
export const LayoutLogin = {
  labelCol: { span: 24, sm: 8 },
  wrapperCol: { span: 24, sm: 16 },
};