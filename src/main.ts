import HandleBars from 'handlebars';
import { Template } from 'handlebars';

import * as Components from './components/index.ts';
import * as helpers from './helpers/index.ts';
import * as Pages from './pages/index.ts';
import Route from './modules/router/route.ts';
import Router from './modules/router/router.ts';
// import Block from './modules/block.ts';

import './assets/scss/main.scss';
import './assets/scss/variables.scss';
// import './pages/loginPage/loginPage.scss';

declare global {
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
}

// enum PagesKey {
//   Nav = 'nav',
//   LoginPage = 'loginPage',
//   ProfileWithAvatarModal = 'profileWithAvatarModal',
//   ProfileEditData = 'profileEditData',
//   SignInPage = 'signInPage',
//   Profile = 'profile',
//   ProfileEditPassword = 'profileEditPassword',
//   MessengerPage = 'messengerPage',
//   MessengerPageWithModal = 'messengerPageWithModal',
//   ServerError = 'serverError',
//   NotFound = 'notFound',
// }

// interface PageComponent<P extends Record<string, unknown> = Record<string, unknown>> {
//   new (props: P): Block<P>;
// }

// const pages: Record<PagesKey, [PageComponent, Record<string, unknown>]> = {
//   [PagesKey.Nav]: [Pages.NavigatePage as PageComponent, {}],
//   [PagesKey.LoginPage]: [Pages.LoginPage as PageComponent, {}],
//   [PagesKey.SignInPage]: [Pages.SignInPage as PageComponent, {}],
//   [PagesKey.Profile]: [Pages.ProfilePage as PageComponent, { name: 'Иван' }],
//   [PagesKey.ProfileEditData]: [Pages.ProfilePage as PageComponent, { edit: true, editType: 'data' }],
//   [PagesKey.ProfileEditPassword]: [Pages.ProfilePage as PageComponent, { edit: true, editType: 'password' }],
//   [PagesKey.ProfileWithAvatarModal]: [Pages.ProfilePage as PageComponent, { isOpen: 'open' }],
//   [PagesKey.MessengerPage]: [Pages.MessengerPage as PageComponent, { isOpen: true }],
//   [PagesKey.MessengerPageWithModal]: [Pages.MessengerPage as PageComponent, {}],
//   [PagesKey.ServerError]: [Pages.ErrorPage as PageComponent, { title: '500', text: 'Уже фиксим' }],
//   [PagesKey.NotFound]: [Pages.ErrorPage as PageComponent, { title: '404', text: 'Не туда попали' }],
// };

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

/** Старая навигация */

// function navigate(page: PagesKey) {
//   const [Source, context] = pages[page];
//   const container = document.getElementById('app');
//
//   if (container) {
//     const pageInstance = new Source(context);
//     container.innerHTML = '';
//
//     const content = pageInstance.getContent();
//     if (content) {
//       container.append(content);
//     } else {
//       console.warn(`Page content is undefined for ${page}`);
//     }
//   }
// }
//
// document.addEventListener('DOMContentLoaded', () => navigate(PagesKey.Nav));
//
// document.addEventListener('click', (e: MouseEvent) => {
//   const target = e.target as HTMLElement;
//   const page = target.dataset.page as keyof typeof pages;
//   if (page) {
//     navigate(page);
//
//     e.preventDefault();
//     e.stopImmediatePropagation();
//   }
// });

/** Пробы роутинга на отдельном Route */

// const loginPageRoute = new Route('/buttons', Pages.LoginPage, {
//   rootQuery: 'app',
//   componentProps: {
//     label: 'ТестКнопочка',
//   },
// });
//
// loginPageRoute.render();
//
// loginPageRoute.navigate('/buttons');
// setTimeout(() => {
//   loginPageRoute.navigate('/trash');
// }, 2000);
// // loginPageRoute.navigate('/trash');
// // loginPageRoute.leave();

/** Пробы роутинга на Router */

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
