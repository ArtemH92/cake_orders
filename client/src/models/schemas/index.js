import * as yup from 'yup'
import { reactive } from 'vue'
import { useForm } from 'vee-validate'

export const schemaLogin = yup.object({
  username: yup.string().required('Это обязательное поле'),
  password: yup.string().required('Это обязательное поле')
})

export const schemaCreateOrder = yup.object({
  dessert: yup.string().required('Это обязательное поле'),
  cakeType: yup.string().required('Это обязательное поле').when('dessert', {
    is: (dessert) => dessert === 'cake',
    then: () => yup.string().required('Это обязательное поле'),
    otherwise: () => yup.string().nullable(),
  }),
  cupcakesType: yup.string().required('Это обязательное поле').when('dessert', {
    is: (dessert) => dessert === 'cupcake',
    then: () => yup.string().required('Это обязательное поле'),
    otherwise: () => yup.string().nullable(),
  }),
  filling: yup.string().required('Это обязательное поле').when('dessert', {
    is: (dessert) => dessert === 'cupcake',
    then: () => yup.string().required('Это обязательное поле'),
    otherwise: () => yup.string().nullable(),
  }),
  quantity: yup.number().required('Это обязательное поле').when('dessert', {
    is: (dessert) => dessert === 'cupcake',
    then: () => yup.number().required('Это обязательное поле'),
    otherwise: () => yup.number().nullable(),
  }),
  dateTime: yup.date().required('Это обязательное поле'),
  status: yup.string(),
  notes: yup.string(),
});