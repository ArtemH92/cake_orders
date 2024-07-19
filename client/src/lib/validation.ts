import type { Rule } from 'ant-design-vue/es/form';

export const validateUsername = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Введите имя пользователя');
  } 
  return Promise.resolve(); 
};

export const requiredField = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Введите пароль');
  }
  return Promise.resolve(); 
};

export const validatePass2 = (password: string) => async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Подтвердите пароль');
  } else if (value !== password) {
    return Promise.reject('Пароли не совпадают');
  } else {
    return Promise.resolve();
  }
};
