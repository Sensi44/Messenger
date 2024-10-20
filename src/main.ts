import HandleBars from 'handlebars';
import { Template } from 'handlebars';

import * as Components from './components/index.ts';
import * as helpers from './helpers/index.ts';
import * as Pages from './pages/index.ts';
import Router from './modules/router/router.ts';
import { getUser } from './services/auth.ts';

import { Store } from './modules/store/store.ts';

import './assets/scss/main.scss';
import './assets/scss/variables.scss';

type HandlebarsComponent = Template<string>;

declare global {
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  interface Window {
    router: Router;
    store: Store;
  }
}

function isHandlebarsComponent(component: unknown): component is HandlebarsComponent {
  return typeof component === 'function' && typeof component.prototype === 'object';
}

Object.entries(Components).forEach(([name, component]) => {
  if (isHandlebarsComponent(component)) {
    HandleBars.registerPartial(name, component);
  } else {
    console.warn(`Component ${name} is not a valid Handlebars component.`);
  }
});

Object.entries(helpers).forEach(([name, helper]) => {
  HandleBars.registerHelper(name, helper);
});

window.store = new Store({
  isLoading: false,
  loginError: null,
  me: [],
  user: null,
  isAuthorized: false,
  // chats: [],
  // user: [],
  // selectedCard: null,
});

// setTimeout(() => {
//   window.store.set({ isAuthorized: false });
// }, 2000);
// setTimeout(() => {
//   window.store.set({ isAuthorized: true });
// }, 3000);

// проверка на зареганного юзера
getUser().then(() => {
  window.store.set({ isAuthorized: true });
});

const router = new Router('app');
router
  .use('/', Pages.NavigatePage)
  .use('/loginPage', Pages.LoginPage)
  .use('/signInPage', Pages.SignInPage)
  .use('/profile', Pages.ProfilePage)
  .use('/profileEditData', Pages.ProfilePage)
  .use('/profileEditPassword', Pages.ProfilePage)
  .use('/profileEditAvatar', Pages.ProfilePage)
  .use('/messengerPage', Pages.MessengerPage)
  .use('/messengerPageModal', Pages.MessengerPage)
  .use('/404', Pages.NotFoundPage)
  .use('/500', Pages.ServerErrorPage)
  .error(Pages.NotFoundPage)
  .start();

window.router = router;

//todo queryString - для преобразование в запросы урл
//todo trim - почти все строковые поля нужно через него
