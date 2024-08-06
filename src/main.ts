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

const pages = {
  nav: [Pages.NavigatePage],
  login: [Pages.LoginPage, { name: 'Вход', form: loginFormContext }],
  signIn: [Pages.SignInPage],
  messenger: [Pages.MessengerPage],
  profile: [Pages.ProfilePage],
  changePassword: [Pages.ChangePasswordPage],
  notFound: [Pages.NotFoundPage],
  serverError: [Pages.ServerErrorPage],
  addModal: [Components.AddUserModal],
  avatarModal: [Components.AvatarModal],
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
