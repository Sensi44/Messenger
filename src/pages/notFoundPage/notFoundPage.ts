import Block from '../../modules/block.ts';
import { Link } from '../../components';

type IErrorPageProps = {
  title: string;
  text: string;
};
type IErrorPageChildren = {
  HomeLink: Link;
};

class NotFoundPage extends Block<Partial<IErrorPageProps>, Partial<IErrorPageChildren>> {
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
         <h1>404</h1>
         <p class="text-xl">Не туда попали</p>
         {{{HomeLink}}}
      </main>
    `;
  }
}

export default NotFoundPage;
