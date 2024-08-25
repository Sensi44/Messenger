import Block from '../../modules/block.ts';
import { Button, LoginForm } from '../../components';
import Input from '../../components/input/input.ts';

class LoginPage extends Block {
  init() {
    console.log(this.props, 'init');
    const LoginButton = new Button({ label: 'Залогиниться', type: 'primary', className: 'testSubmit' });
    const TestInput = new Input({ placeholder: 'плэйсхолдер' });
    const FormLogin = new LoginForm({ name: 'Вход', form: this.props.form });

    this.children = {
      ...this.children,
      LoginButton,
      TestInput,
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
