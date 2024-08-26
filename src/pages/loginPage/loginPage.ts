import Block from '../../modules/block.ts';
import { LoginForm } from '../../components';

class LoginPage extends Block {
  loginFormContext;

  init() {
    this.loginFormContext = [
      {
        name: 'login',
        label: 'Логин',
      },
      {
        name: 'password',
        label: 'Пароль',
      },
    ];

    console.log('?a', this.loginFormContext);
    const FormLogin = new LoginForm({ name: 'Вход', form: this.loginFormContext });

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
