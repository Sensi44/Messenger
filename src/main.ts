import HandleBars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
  'login': [Pages.LoginPage, {test: '123'}],
  'list': [Pages.ListPage],
  'nav': [Pages.NavigatePage],
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
  const page = target.getAttribute('page');
  if (page) {
    navigate(page);
    
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
