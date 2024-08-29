import Block from '../../modules/block.ts';
import { SignInForm } from '../../components';

class SignInPage extends Block<object> {
  init() {
    const FormSignIn = new SignInForm({
      name: 'Регистрация',
    });

    this.children = {
      ...this.children,
      FormSignIn,
    };
  }

  render() {
    return `
      <main class="loginPage basePage vertical">
         {{{ FormSignIn }}}
      </main>
    `;
  }
}

export default SignInPage;
