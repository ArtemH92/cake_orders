import * as yup from 'yup'

export const schemaLogin = yup.object({
  username: yup.string().required('Это обязательное поле'),
  password: yup.string().required('Это обязательное поле')
})