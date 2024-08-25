import Block from '../../modules/block.ts';
import { Button, Form } from '../../components';
import Input from '../../components/input/input.ts';

class LoginPage extends Block {
  // constructor(props) {
  //   super({
  //     ...props,
  //     LoginButton: new Button({ label: 'Залогиниться', type: 'primary', className: 'testSubmit' }),
  //     TestInput: new Input({ placeholder: 'плэйсхолдер' }),
  //     FormLogin: new Form({ name: 'Вход' }),
  //   });
  // }

  init() {
    console.log(this.props, 'init');
    const LoginButton = new Button({ label: 'Залогиниться', type: 'primary', className: 'testSubmit' });
    const TestInput = new Input({ placeholder: 'плэйсхолдер' });
    const FormLogin = new Form({ name: 'Вход', form: this.props.form });

    this.children = {
      ...this.children,
      LoginButton,
      TestInput,
      FormLogin,
    };
  }

  render() {
    // console.log(this.props);
    return `
      <main class="loginPage basePage vertical">
         {{{ FormLogin }}}
      </main>
    `;
  }
}

export default LoginPage;
