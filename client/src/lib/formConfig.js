import { validateRequired, validateConfirmPass } from './validation'

//rules 

export const RulesLogin = {
  username: [{ required: true, validator: validateRequired, trigger: 'change' }],
  password: [{ required: true, validator: validateRequired, trigger: 'change' }],
};

export const RulesRegister = (password) => ({
  username: [{ required: true, validator: validateRequired, trigger: 'change' }],
  password: [{ required: true, validator: validateRequired, trigger: 'change' }],
  confirmPassword: [{ required: true, validator: validateConfirmPass(password), trigger: 'change' }]
});

export const RulesCreateOrder = (data) => {
  const rules = { 
    dessert: [{ required: true, validator: validateRequired, trigger: 'change' }],
    date: [{ required: true, validator: validateRequired, trigger: 'change' }],
    time: [{ required: true, validator: validateRequired, trigger: 'change' }]
  } 
  if(data.dessert === 'cake') {
    rules.cakeType = [{ required: true, validator: validateRequired, trigger: 'change' }];
  } else if (data.dessert === 'cupcake') {
    rules.cupcakesType = [{ required: true, validator: validateRequired, trigger: 'change' }];
    rules.filling = [{ required: true, validator: validateRequired, trigger: 'change' }];
    rules.quantity = [{ required: true, validator: validateRequired, trigger: 'change' }];
  }
  return rules
}

//layout
export const FormLayout = {
  labelCol: { span: 24, sm: 8 },
  wrapperCol: { span: 24, sm: 16 },
};