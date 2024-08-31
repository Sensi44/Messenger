import Block from '../../modules/block.ts';
import { Link } from '../../components';

import type { IErrorPageProps } from './errorPage.props.ts';
type IErrorPageChildren = {
  HomeLink: Link;
};

class ErrorPage extends Block<IErrorPageProps, IErrorPageChildren> {
  constructor(props: IErrorPageProps & IErrorPageChildren) {
    super(props);
  }

  init() {
    const HomeLink = new Link({ url: 'nav', class: 'homeButton', text: 'Назад к чатам' });

    this.children = {
      ...this.children,
      HomeLink,
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
