import { validateUsername, validatePass, validatePass2 } from './validation'
import type { Rule } from 'ant-design-vue/es/form';

//rules 

export const RulesLogin: Record<string, Rule[]> = {
  username: [{ required: true, validator: validateUsername, trigger: 'change' }],
  password: [{ required: true, validator: validatePass, trigger: 'change' }],
};

export const RulesRegister = (password: string): Record<string, Rule[]> => ({
  username: [{ required: true, validator: validateUsername, trigger: 'change' }],
  password: [{ required: true, validator: validatePass, trigger: 'change' }],
  confirmPassword: [{ required: true, validator: validatePass2(password), trigger: 'change' }]
});

//layout
export const LayoutLogin = {
  labelCol: { span: 24, sm: 8 },
  wrapperCol: { span: 24, sm: 16 },
};