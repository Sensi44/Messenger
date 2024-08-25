import HandleBars from 'handlebars';

// import { a } from './learn.ts';
import * as Components from './components/index.ts';
import * as helpers from './helpers/index.ts';
import * as Pages from './pages/index.ts';
import { loginFormContext } from './pages/loginPage/loginPageContext.ts';
import { SignInFormContext } from './pages/signInPage/signInContext.ts';
import { profileContext } from './pages/profilePage/profileContext.ts';
import { messengerContext } from './pages/messengerPage/messangerContext.ts';
import { logPage } from './pages/loginPage';
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

const pages = {
  'login': [Pages.logPage, {
    form: loginFormContext,
    withInternalID: true
  }],
}

/** инициализация навигации и компонентов */
Object.entries(Components).forEach(([name, component]) => {
  HandleBars.registerPartial(name, component);
});

Object.entries(helpers).forEach(([name, helper]) => {
  HandleBars.registerHelper(name, helper);
});

function navigate(page: string) {
  const [ source, context ] = pages[page];
  const container = document.getElementById('app');
  if (source instanceof Object) {
    const page = new source(context);
    container.innerHTML = '';
    container.append(page.getContent());
    // page.dispatchComponentDidMount();
    return;
  }

  container.innerHTML = HandleBars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const page = target.dataset.page as keyof typeof pages;
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});


// render('#app', logPage);
