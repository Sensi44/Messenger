import Block from '../../modules/block.ts';
import { LoginForm } from '../../components';

type LoginPageProps = {};
type LoginPageChildren = {
  FormLogin: LoginForm;
};

class LoginPage extends Block<LoginPageProps, LoginPageChildren> {
  init() {
    const FormLogin = new LoginForm({ name: 'Вход' });

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
