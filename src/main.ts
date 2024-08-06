import HandleBars from 'handlebars';

import * as Components from './components';
import * as Pages from './pages';

const pages = {
  'nav': [Pages.NavigatePage],
  'login': [Pages.LoginPage, {test: '123'}],
  'signIn': [Pages.SignInPage],
  'messenger': [Pages.MessengerPage],
  'profile': [Pages.ProfilePage],
  'changePassword': [Pages.ChangePasswordPage],
  'notFound': [Pages.NotFoundPage],
  'serverError': [Pages.ServerErrorPage],
  'addModal': [Components.AddUserModal],
  'avatarModal': [Components.AvatarModal],
}

Object.entries(Components).forEach(([name, component]) => {
  HandleBars.registerPartial(name, component);
})

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
  console.log(page);
  if (page) {
    navigate(page);
    
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
