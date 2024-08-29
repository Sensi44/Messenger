import HandleBars from 'handlebars';
import { Template } from 'handlebars';

import * as Components from './components/index.ts';
import * as helpers from './helpers/index.ts';
import * as Pages from './pages/index.ts';
import Block from './modules/block.ts';

import './assets/scss/main.scss';
import './assets/scss/variables.scss';

declare global {
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
}

enum PagesKey {
  Nav = 'nav',
  LoginPage = 'loginPage',
  ProfileWithAvatarModal = 'profileWithAvatarModal',
  ProfileEditData = 'profileEditData',
  SignInPage = 'signInPage',
  Profile = 'profile',
  ProfileEditPassword = 'profileEditPassword',
  MessengerPage = 'messengerPage',
  MessengerPageWithModal = 'messengerPageWithModal',
  ServerError = 'serverError',
  NotFound = 'notFound',
}

interface PageComponent<P extends Record<string, unknown> = Record<string, unknown>> {
  new (props: P): Block<P>;
}

const pages: Record<PagesKey, [PageComponent, Record<string, unknown>]> = {
  [PagesKey.Nav]: [Pages.NavigatePage as PageComponent, {}],
  [PagesKey.LoginPage]: [Pages.LoginPage as PageComponent, {}],
  [PagesKey.SignInPage]: [Pages.SignInPage as PageComponent, {}],
  [PagesKey.Profile]: [Pages.ProfilePage as PageComponent, { name: 'Иван' }],
  [PagesKey.ProfileEditData]: [Pages.ProfilePage as PageComponent, { edit: true, editType: 'data' }],
  [PagesKey.ProfileEditPassword]: [Pages.ProfilePage as PageComponent, { edit: true, editType: 'password' }],
  [PagesKey.ProfileWithAvatarModal]: [Pages.ProfilePage as PageComponent, { isOpen: 'open' }],
  [PagesKey.MessengerPage]: [Pages.MessengerPage as PageComponent, { isOpen: true }],
  [PagesKey.MessengerPageWithModal]: [Pages.MessengerPage as PageComponent, {}],
  [PagesKey.ServerError]: [Pages.ErrorPage as PageComponent, { title: '500', text: 'Уже фиксим' }],
  [PagesKey.NotFound]: [Pages.ErrorPage as PageComponent, { title: '404', text: 'Не туда попали' }]
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
  const [Source, context] = pages[page];
  const container = document.getElementById('app');

  if (container) {
    const pageInstance = new Source(context);
    container.innerHTML = '';

    const content = pageInstance.getContent();
    if (content) {
      container.append(content);
    } else {
      console.warn(`Page content is undefined for ${page}`);
    }
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
