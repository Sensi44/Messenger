import Block from '../../modules/block.ts';
import { Link } from '../../components';

// import type { IErrorPageProps } from './errorPage.props.ts';
type IErrorPageProps = {
  title: string;
  text: string;
};
type IErrorPageChildren = {
  HomeLink: Link;
};

class ErrorPage extends Block<Partial<IErrorPageProps>, Partial<IErrorPageChildren>> {
  constructor(props: Partial<IErrorPageProps> & Partial<IErrorPageChildren>) {
    super(props);
  }

  init() {
    const HomeLink = new Link({ url: 'nav', class: 'homeButton', text: 'Назад к чатам' });

    const pathName = window.location.pathname;
    let newProps = {};
    switch (pathName) {
      case '/404':
        newProps = { title: '404', text: 'Не туда попали' };
        break;
      case '/500':
        newProps = { title: '500', text: 'Уже фиксим' };
        break;
      default:
        break;
    }

    this.children = {
      ...this.children,
      HomeLink,
    };

    this.props = {
      ...this.props,
      ...newProps,
    };
  }

  render() {
    return `
      <main class="errorPage basePage vertical">
         <h1>{{title}}</h1>
         <p class="text-xl">{{text}}</p>
         {{{HomeLink}}}
      </main>
    `;
  }
}

export default ErrorPage;
