import HandleBars from 'handlebars';
import { Template } from 'handlebars';

import * as Components from './components/index.ts';
import * as helpers from './helpers/index.ts';
import * as Pages from './pages/index.ts';
// import { SignInFormContext } from './pages/signInPage/signInContext.ts';
// import { profileContext } from './pages/profilePage/profileContext.ts';
// import { messengerContext } from './pages/messengerPage/messangerContext.ts';
// import { logPage } from './pages/loginPage';
// import { testPage } from './pages/testPage';
// import { Button } from './components/button';
// import { render } from './helpers/renderDom.ts';

import './assets/scss/main.scss';
import './assets/scss/variables.scss';

declare global {
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
}

type PagesKey = 'nav' | 'loginPage' | 'serverError' | 'profileEditData' | 'notFound' | 'signInPage' | 'profile' | 'profileEditPassword';

// const pages = {
//   nav: [Pages.NavigatePage],
//   login: [Pages.LoginPage, { name: 'Вход', form: loginFormContext }],
//   signIn: [Pages.SignInPage, { name: 'Регистрация', form: SignInFormContext }],
//   messenger: [Pages.MessengerPage, { data: messengerContext }],
//   messengerWithModal: [Pages.MessengerPage, { isOpen: 'open', data: messengerContext }],
//   profile: [Pages.ProfilePage, { editType: 'none', name: 'Иван', userData: profileContext }],
//   profileEditData: [Pages.ProfilePage, { edit: true, editType: 'data', userData: profileContext }],
//   profileEditPassword: [Pages.ProfilePage, { edit: true, editType: 'password', userData: profileContext }],
//   profileWithAvatarModal: [
//     Pages.ProfilePage,
//     {
//       isOpen: 'open',
//       editType: 'none',
//       name: 'Иван',
//       userData: profileContext,
//     },
//   ],
//   serverError: [Pages.ServerErrorPage],
//   notFound: [Pages.NotFoundPage],
//   LoginPage: LoginPage,
// };
// console.log('!', Pages);

const pages: Record<PagesKey, [any, Record<string, unknown>]> = {
  nav: [Pages.NavigatePage, {}],
  loginPage: [Pages.LoginPage, {}],
  signInPage: [Pages.SignInPage, {}],
  profile: [Pages.ProfilePage, { name: 'Иван' }],
  profileEditData: [Pages.ProfilePage, { edit: true, editType: 'data' }],
  profileEditPassword: [Pages.ProfilePage, { edit: true, editType: 'password' }],
  // profileWithAvatarModal: [Pages.ProfilePage, { isOpen: 'open' }],
  serverError: [Pages.ErrorPage, { title: '500', text: 'Уже фиксим' }],
  notFound: [Pages.ErrorPage, { title: '404', text: 'не туда попали' }],
};

type HandlebarsComponent = Template<string>;
function isHandlebarsComponent(component: unknown): component is HandlebarsComponent {
  return typeof component === 'function' && typeof component.prototype === 'object';
}

/** инициализация навигации и компонентов */
Object.entries(Components).forEach(([name, component]) => {
  // Предположите, что component имеет тип HandlebarsComponent
  if (isHandlebarsComponent(component)) {
    HandleBars.registerPartial(name, component);
  } else {
    console.warn(`Component ${name} is not a valid Handlebars component.`);
  }
});

/** была инициализация: */
// Object.entries(Components).forEach(([name, component]) => {
//   HandleBars.registerPartial(name, component);
// });

Object.entries(helpers).forEach(([name, helper]) => {
  HandleBars.registerHelper(name, helper);
});

function navigate(page: PagesKey) {
  const [source, context] = pages[page];
  const container = document.getElementById('app');

  if (container) {
    if (source instanceof Object) {
      const page = new source(context);
      container.innerHTML = '';
      container.append(page.getContent());
      // page.dispatchComponentDidMount();
      return;
    }

    container.innerHTML = HandleBars.compile(source)(context);
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
