import type { Rule } from 'ant-design-vue/es/form';

export const validateRequired= async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Это поле обязятельно');
  }
  return Promise.resolve(); 
};

export const validateConfirmPass = (password: string) => async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Подтвердите пароль');
  } else if (value !== password) {
    return Promise.reject('Пароли не совпадают');
  } else {
    return Promise.resolve();
  }
};
