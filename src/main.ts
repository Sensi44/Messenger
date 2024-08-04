import HandleBars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import cat1 from './assets/img/1.png';
import cat2 from './assets/img/2.png';
import cat3 from './assets/img/3.png';

const pages = {
  'login': [Pages.LoginPage, {test: '123'}],
  'list': [Pages.ListPage, { cats: [
      { name: 'cat-1', avatar: cat1 },
      { name: 'cat-2', avatar: cat2, active: true },
      { name: 'cat-3', avatar: cat3 },
    ]}],
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
