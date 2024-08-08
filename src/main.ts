import HandleBars from 'handlebars';

import * as Components from './components';
import * as helpers from './helpers';
import * as Pages from './pages';

import './assets/scss/main.scss';
import './assets/scss/variables.scss';

const loginFormContext = [
  {
    name: 'login',
    placeHolder: 'логин',
    error: {
      message: 'неверный логин',
    },
  },
  {
    name: 'password',
    type: 'password',
    placeHolder: 'пароль',
    error: {
      message: 'неверный пароль',
    },
  },
];
const SignInFormContext = [
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
    type: 'tel'
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
const profileContext = [
  {
    name: 'email',
    placeHolder: 'Почта',
    value: 'pochta@yandex.ru',
    type: 'mail',
  },
  {
    name: 'login',
    value: 'ivanivanov',
    placeHolder: 'логин',
  },
  {
    name: 'first_name',
    placeHolder: 'Имя',
    value: 'Иван',
  },
  {
    name: 'second_name',
    placeHolder: 'Фамилия',
    value: 'Иванов',
  },
  {
    name: 'display_name',
    placeHolder: 'Имя в чате',
    value: 'Иван(имя в чате)',
  },
  {
    name: 'phone',
    placeHolder: 'Телефон',
    value: '+7 (909) 967 30 30',
    type: 'tel',
  },
]

const pages = {
  nav: [Pages.NavigatePage],
  login: [Pages.LoginPage, { name: 'Вход', form: loginFormContext }],
  signIn: [Pages.SignInPage, { name: 'Регистрация', form: SignInFormContext }],
  messenger: [Pages.MessengerPage],
  profile: [Pages.ProfilePage, { editType: 'none', name: 'Иван', userData: profileContext }],
  profileEditData: [Pages.ProfilePage, { edit: true, editType: 'data', userData: profileContext }],
  profileEditPassword: [Pages.ProfilePage, { edit: true, editType: 'password', userData: profileContext }],
  addModal: [Components.AddUserModal],
  avatarModal: [Components.AvatarModal],
  serverError: [Pages.ServerErrorPage],
  notFound: [Pages.NotFoundPage],
};

Object.entries(Components).forEach(([name, component]) => {
  HandleBars.registerPartial(name, component);
});

Object.entries(helpers).forEach(([name, helper]) => {
  HandleBars.registerHelper(name, helper);
});

function navigate(page: string) {
  const [source, context] = pages[page];
  const container = document.getElementById('app');
  const templatingFunction = HandleBars.compile(source);
  container.innerHTML = templatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const page = target.dataset.page;
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
