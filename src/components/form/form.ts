import Block from '../../modules/block.ts';
import { Input } from '../input';

class Form extends Block {
  // constructor(props) {
  //   super({
  //     ...props,
  //     LoginFormBody: new FormBody({ form: props.form }),
  //   });
  // }

  init() {
    const onChangeLoginBind = this.onChangeLogin.bind(this);

    const InputLogin = new Input({
      name: 'login',
      label: 'Логин',
      // error: 'неверный логин',
      events: {
        blur: (e) => onChangeLoginBind(e),
      },
    });
    const LoginPassword = new Input({
      name: 'password',
      label: 'Пароль',
      // error: 'неверный логин',
    });

    this.children = {
      ...this.children,
      InputLogin,
      LoginPassword,
    };
  }

  onChangeLogin(e) {
    const inputValue = e.target.value;
    if (inputValue.length > 3) {
      this.children.InputLogin.setProps({
        ...this.children.InputLogin.props,
        value: inputValue,
        error: 'неверный логин',
      });
    }
  }

  render() {
    return `
      <form class="viForm">
        <h2>{{name}}</h2>
        
        <div class="viForm__body">
          {{{ InputLogin }}}
          {{{ LoginPassword }}}
        </div>
      </form>
    `;
  }
}

export default Form;
