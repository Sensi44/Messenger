import Block from '../../modules/block';
import { Button, Input, Link } from '../../components';

class LoginForm extends Block {
  init() {
    const onChangeLoginBind = this.onChangeLogin.bind(this);

    const InputLogin = new Input({ name: 'login', label: 'Логин', events: { blur: (e) => onChangeLoginBind(e) } });
    const LoginPassword = new Input({ name: 'password', label: 'Пароль' });
    const LoginButton = new Button({ label: 'Авторизоваться', type: 'primary' });
    const HomeLink = new Link({ url: '#', dataAttr: 'nav', class: 'home homeButton', text: 'Нет аккаунта?' });

    this.children = {
      ...this.children,
      InputLogin,
      LoginPassword,
      LoginButton,
      HomeLink,
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
        
        <div class="viForm__actions">
            {{{ LoginButton }}}
            {{{ HomeLink }}}
        </div>
      </form>
    `;
  }
}

export default LoginForm;
