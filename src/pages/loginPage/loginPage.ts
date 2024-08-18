import Block from '../../modules/block.ts';

import { compile } from '../../modules/compile.ts';
import LoginPageHbs from './loginPage.hbs?raw';

class LoginPage extends Block {
  constructor(props) {
    super('div', props);
  }

  render() {
    return compile(LoginPageHbs as string, this.props);
  }

  test() {
    this.setProps({
      form: [
        {
          name: 'login',
          placeHolder: 'логин222',
          error: {
            message: 'неверный логин',
          },
        },
        {
          name: 'password',
          type: 'password',
          placeHolder: 'пароль22',
          error: {
            message: 'неверный пароль',
          },
        },
      ],
    });
  }
}

export default LoginPage;
