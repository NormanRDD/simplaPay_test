import { extend } from 'vee-validate'
import { required, email, min, length } from 'vee-validate/dist/rules'
// No message specified.f

// extend('min', value => {
//   return value.length >= 3;
// });
extend('length', { ...length, message: 'length' })
extend('email', { ...email, message: 'Некорректный email' })
extend('min', { ...min, message: 'Введите не менее 10 символов' })
// Override the default message.
extend('required', {
  ...required,
  message: 'Заполните форму',
})
