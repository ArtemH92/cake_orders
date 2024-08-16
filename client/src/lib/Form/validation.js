export const validateRequired= async (_rule, value) => {
  if (value === '') {
    return Promise.reject('Это поле обязятельно');
  }
  return Promise.resolve(); 
};

export const validateConfirmPass = (password) => async (_rule, value) => {
  if (value === '') {
    return Promise.reject('Подтвердите пароль');
  } else if (value !== password) {
    return Promise.reject('Пароли не совпадают');
  } else {
    return Promise.resolve();
  }
};