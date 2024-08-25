import Block from '../../modules/block.ts';
import { Link } from '../../components';

class ErrorPage extends Block {
  init() {
    const HomeLink = new Link({ ...this.props.link });

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
