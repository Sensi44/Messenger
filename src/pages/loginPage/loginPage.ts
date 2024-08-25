import Block from '../../modules/block.ts';
import LoginPageHbs from './loginPage.hbs?raw';
import { loginFormContext } from './loginPageContext.ts';
import { Button } from '../../components';
import Input from '../../components/input/input.ts';

class LoginPage extends Block {
  // props;
  //
  // constructor(props) {
  //   super('article', { ...props, withInternalID: true });
  //   this.props = props;
  // }
  //
  // render() {
  //   return this.compile(LoginPageHbs as string, this.props);
  // }

  constructor(props) {
    super({
      ...props,
      LoginButton: new Button({ label: 'Залогиниться', type: 'primary', className: 'testSubmit' }),
      TestInput: new Input({ placeholder: 'asdasdasd' }),
    });
  }

  render() {
    return `
      <main class="loginPage basePage vertical">
        {{{ LoginButton }}}
        {{{ TestInput }}}
      </main>
    `;
  }
}

const logPage = new LoginPage({
  form: loginFormContext,
  withInternalID: true,
  // events: {
  //   click: (event) => {
  //     console.log(event);
  //   },
  // },
});

// setTimeout(() => {
//   logPage.setProps({
//     label: '123123123123',
//   });
// }, 2000);

export default LoginPage;
