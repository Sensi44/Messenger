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

class ServerErrorPage extends Block<Partial<IErrorPageProps>, Partial<IErrorPageChildren>> {
  constructor(props: Partial<IErrorPageProps> & Partial<IErrorPageChildren>) {
    super(props);
  }

  init() {
    const HomeLink = new Link({ url: '/', class: 'homeButton', text: 'Назад к чатам' });
    this.children = {
      ...this.children,
      HomeLink,
    };
  }

  render() {
    return `
      <main class="errorPage basePage vertical">
         <h1>500</h1>
         <p class="text-xl">Уже фиксим</p>
         {{{HomeLink}}}
      </main>
    `;
  }
}

export default ServerErrorPage;
