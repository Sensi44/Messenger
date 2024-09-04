import HandleBars from 'handlebars';
import { Template } from 'handlebars';

import * as Components from './components/index.ts';
import * as helpers from './helpers/index.ts';
import * as Pages from './pages/index.ts';
import Router from './modules/router/router.ts';

import './assets/scss/main.scss';
import './assets/scss/variables.scss';

declare global {
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
}

type HandlebarsComponent = Template<string>;
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


/** Роутинг */
const router = new Router('app');
router
  .use('/', Pages.NavigatePage)
  .use('/loginPage', Pages.LoginPage)
  .use('/signInPage', Pages.SignInPage)
  .use('/profilePage', Pages.ProfilePage)
  .use('/profileEditData', Pages.ProfilePage)
  .use('/profileEditPassword', Pages.ProfilePage)
  .use('/profileEditAvatar', Pages.ProfilePage)
  .use('/404', Pages.ErrorPage)
  .use('/500', Pages.ErrorPage);
// router.go('/loginPage');
router.go('/');

window.router = router;
