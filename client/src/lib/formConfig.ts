import { validateRequired, validateConfirmPass } from './validation'
import type { Rule } from 'ant-design-vue/es/form';

//rules 

export const RulesLogin: Record<string, Rule[]> = {
  username: [{ required: true, validator: validateRequired, trigger: 'change' }],
  password: [{ required: true, validator: validateRequired, trigger: 'change' }],
};

export const RulesRegister = (password: string): Record<string, Rule[]> => ({
  username: [{ required: true, validator: validateRequired, trigger: 'change' }],
  password: [{ required: true, validator: validateRequired, trigger: 'change' }],
  confirmPassword: [{ required: true, validator: validateConfirmPass(password), trigger: 'change' }]
});

//layout
export const LayoutLogin = {
  labelCol: { span: 24, sm: 8 },
  wrapperCol: { span: 24, sm: 16 },
};