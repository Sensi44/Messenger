import HandleBars from 'handlebars';

// import { a } from './learn.ts';
import * as Components from './components/index.ts';
import * as helpers from './helpers/index.ts';
import * as Pages from './pages/index.ts';
import { loginFormContext } from './pages/loginPage/loginPageContext.ts';
import { SignInFormContext } from './pages/signInPage/signInContext.ts';
import { profileContext } from './pages/profilePage/profileContext.ts';
import { messengerContext } from './pages/messengerPage/messangerContext.ts';
import { LoginPage } from './pages/loginPage';
import { testPage } from './pages/testPage';
import { Button } from './components/button';
import { render } from './helpers/renderDom.ts';

import './assets/scss/main.scss';
import './assets/scss/variables.scss';

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

/** инициализация навигации и компонентов */
Object.entries(Components).forEach(([name, component]) => {
  HandleBars.registerPartial(name, component);
});

Object.entries(helpers).forEach(([name, helper]) => {
  HandleBars.registerHelper(name, helper);
});

// function navigate(page: keyof typeof pages) {
//   const container = document.getElementById('app');
//
//   if (container) {
//     if (page === 'LoginPage') {
//       const logPage = new LoginPage({ form: loginFormContext });
//       container.innerHTML = logPage.render();
//       logPage.test();
//     } else {
//       const [source, context] = pages[page];
//       const templatingFunction = HandleBars.compile(source);
//       container.innerHTML = templatingFunction(context);
//     }
//   }
// }
//
// document.addEventListener('DOMContentLoaded', () => navigate('nav'));
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

/** last */
// const logPage = new LoginPage({
//   form: loginFormContext,
//   events: {
//     click: (event) => {
//       console.log(event);
//     },
//   },
// });
//
// console.log('создан новый экземпляр: logPage', logPage);
//
// render('#app', logPage);
//
// setTimeout(() => {
//   logPage.setProps({
//     form: [
//       {
//         name: 'login',
//         placeHolder: 'логин222',
//         value: '123123123',
//         error: {
//           message: 'неверный логин',
//         },
//       },
//       {
//         name: 'password',
//         type: 'password',
//         placeHolder: 'пароль22',
//         error: {
//           message: 'неверный пароль',
//         },
//       },
//     ],
//   });
// }, 2000);

// const testPage = new TestPage({
//   userName: 'John Doe',
// });

render('#app', testPage);
