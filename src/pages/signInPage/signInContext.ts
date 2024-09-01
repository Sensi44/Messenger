export const SignInFormContext = [
  {
    name: 'email',
    placeHolder: 'Почта',
    type: 'mail',
  },
  {
    name: 'login',
    placeHolder: 'логин',
  },
  {
    name: 'first_name',
    placeHolder: 'Имя',
  },
  {
    name: 'second_name',
    placeHolder: 'Фамилия',
  },
  {
    name: 'phone',
    placeHolder: 'Телефон',
    type: 'tel',
  },
  {
    name: 'password',
    type: 'password',
    class: 'viInput__input_error',
    placeHolder: 'пароль',
  },
  {
    name: 'password',
    type: 'password',
    class: 'viInput__input_error',
    placeHolder: 'пароль (ещё раз)',
    error: {
      message: 'пароли не совпадают',
    },
  },
];
