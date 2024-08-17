import HandleBars from 'handlebars';

import * as Components from './components/index.ts';
import * as helpers from './helpers/index.ts';
import * as Pages from './pages/index.ts';
import { loginFormContext } from './pages/loginPage/loginPageContext.ts';
import { SignInFormContext } from './pages/signInPage/signInContext.ts';
import { profileContext } from './pages/profilePage/profileContext.ts';
import { messengerContext } from './pages/messengerPage/messangerContext.ts';

import './assets/scss/main.scss';
import './assets/scss/variables.scss';

const pages = {
  nav: [Pages.NavigatePage],
  login: [Pages.LoginPage, { name: 'Вход', form: loginFormContext }],
  signIn: [Pages.SignInPage, { name: 'Регистрация', form: SignInFormContext }],
  messenger: [Pages.MessengerPage, { data: messengerContext }],
  messengerWithModal: [Pages.MessengerPage, { isOpen: 'open', data: messengerContext }],
  profile: [Pages.ProfilePage, { editType: 'none', name: 'Иван', userData: profileContext }],
  profileEditData: [Pages.ProfilePage, { edit: true, editType: 'data', userData: profileContext }],
  profileEditPassword: [Pages.ProfilePage, { edit: true, editType: 'password', userData: profileContext }],
  profileWithAvatarModal: [
    Pages.ProfilePage,
    {
      isOpen: 'open',
      editType: 'none',
      name: 'Иван',
      userData: profileContext,
    },
  ],
  serverError: [Pages.ServerErrorPage],
  notFound: [Pages.NotFoundPage],
  testPage: [Pages.TestPage],
};

/** инициализация навигации и компонентов */

Object.entries(Components).forEach(([name, component]) => {
  HandleBars.registerPartial(name, component);
});

Object.entries(helpers).forEach(([name, helper]) => {
  HandleBars.registerHelper(name, helper);
});

function navigate(page: keyof typeof pages) {
  const [source, context] = pages[page];
  const container = document.getElementById('app');
  const templatingFunction = HandleBars.compile(source);
  if (container) {
    container.innerHTML = templatingFunction(context);

    if (page === 'testPage') {
      import('./pages/test/controller.ts')
        .then((module) => {
          module.initializeTestPage();
        });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const page = target.dataset.page as keyof typeof pages;
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
