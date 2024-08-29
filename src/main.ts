import HandleBars from 'handlebars';
import { Template } from 'handlebars';

import * as Components from './components/index.ts';
import * as helpers from './helpers/index.ts';
import * as Pages from './pages/index.ts';

import './assets/scss/main.scss';
import './assets/scss/variables.scss';

declare global {
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
}

// type PagesKey = 'nav' | 'loginPage' | 'serverError' | 'profileWithAvatarModal' | 'profileEditData' | 'notFound' | 'signInPage' | 'profile' | 'profileEditPassword' | 'messengerPage' | 'messengerPageWithModal';

enum PagesKey {
  Nav = 'nav',
  LoginPage = 'loginPage',
  ServerError = 'serverError',
  ProfileWithAvatarModal = 'profileWithAvatarModal',
  ProfileEditData = 'profileEditData',
  NotFound = 'notFound',
  SignInPage = 'signInPage',
  Profile = 'profile',
  ProfileEditPassword = 'profileEditPassword',
  MessengerPage = 'messengerPage',
  MessengerPageWithModal = 'messengerPageWithModal',
}

const pages: Record<PagesKey, [any, Record<string, unknown>]> = {
  [PagesKey.Nav]: [Pages.NavigatePage, {}],
  [PagesKey.LoginPage]: [Pages.LoginPage, {}],
  [PagesKey.SignInPage]: [Pages.SignInPage, {}],
  [PagesKey.Profile]: [Pages.ProfilePage, { name: 'Иван' }],
  [PagesKey.ProfileEditData]: [Pages.ProfilePage, { edit: true, editType: 'data' }],
  [PagesKey.ProfileEditPassword]: [Pages.ProfilePage, { edit: true, editType: 'password' }],
  [PagesKey.ProfileWithAvatarModal]: [Pages.ProfilePage, { isOpen: 'open' }],
  [PagesKey.MessengerPage]: [Pages.MessengerPage, { isOpen: true }],
  [PagesKey.MessengerPageWithModal]: [Pages.MessengerPage, {}],
  [PagesKey.ServerError]: [Pages.ErrorPage, { title: '500', text: 'Уже фиксим' }],
  [PagesKey.NotFound]: [Pages.ErrorPage, { title: '404', text: 'не туда попали' }],
};

type HandlebarsComponent = Template<string>;
function isHandlebarsComponent(component: unknown): component is HandlebarsComponent {
  return typeof component === 'function' && typeof component.prototype === 'object';
}

/** инициализация навигации и компонентов */
Object.entries(Components).forEach(([name, component]) => {
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

document.addEventListener('DOMContentLoaded', () => navigate(PagesKey.MessengerPage));

document.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const page = target.dataset.page as keyof typeof pages;
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

