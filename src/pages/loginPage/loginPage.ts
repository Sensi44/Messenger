import Block from '../../modules/block.ts';
import { LoginForm } from '../../components';
import { loginFormContext } from './loginPageContext.ts';

class LoginPage extends Block {
  init() {
    const FormLogin = new LoginForm({ name: 'Вход', form: loginFormContext });

    this.children = {
      ...this.children,
      FormLogin,
    };
  }

  render() {
    return `
      <main class="loginPage basePage vertical">
         {{{ FormLogin }}}
      </main>
    `;
  }
}

export default LoginPage;
