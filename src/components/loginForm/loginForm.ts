import Block from '../../modules/block';
import { Button, Input, Link } from '../../components';

class LoginForm extends Block {
  loginValue = '';
  passwordValue = '';
  loginRegex = /^(?!.*[_.-]{2})[a-zA-Z][a-zA-Z0-9_.-]{2,19}$/;
  passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;

  init() {
    const onBlurLoginBind = this.onBlurLogin.bind(this);
    const onBlurPasswordBind = this.onBlurPassword.bind(this);
    const onChangeInputBind = this.onChangeInput.bind(this);
    const onSubmitButtonBind = this.onSubmitButton.bind(this);

    const InputLogin = new Input({
      ...this.props.form[0],
      value: this.loginValue,
      blur: onBlurLoginBind,
      onChange: onChangeInputBind,
    });
    const LoginPassword = new Input({
      ...this.props.form[1],
      value: this.passwordValue,
      type: 'password',
      blur: onBlurPasswordBind,
      onChange: onChangeInputBind,
    });
    const LoginButton = new Button({
      label: 'Авторизоваться',
      type: 'primary',
      submit: onSubmitButtonBind,
    });
    const HomeLink = new Link({
      url: '#',
      dataAttr: 'nav',
      class: 'home homeButton',
      text: 'Нет аккаунта?',
    });

    this.children = {
      ...this.children,
      InputLogin,
      LoginPassword,
      LoginButton,
      HomeLink,
    };
  }

  onChangeInput(e) {
    if (e.target.name === 'login') {
      this.loginValue = e.target.value;
    } else {
      this.passwordValue = e.target.value;
    }
  }

  onBlurLogin(e) {
    const inputValue = e.target.value;

    if (!this.loginRegex.test(inputValue)) {
      this.children.InputLogin.setProps({
        // ...this.children.InputLogin.props,
        value: inputValue,
        error: 'Неверный логин',
      });
    } else {
      this.children.InputLogin.setProps({
        // ...this.children.InputLogin.props,
        value: inputValue,
        error: '',
      });
    }
  }

  onBlurPassword(e) {
    const inputValue = e.target.value;

    if (!this.passwordRegex.test(inputValue)) {
      this.children.LoginPassword.setProps({
        ...this.children.LoginPassword.props,
        value: inputValue,
        error: 'неверный пароль',
      });
    } else {
      this.children.LoginPassword.setProps({
        ...this.children.LoginPassword.props,
        value: inputValue,
        error: '',
      });
    }
  }

  onSubmitButton(e) {
    e.preventDefault();
    const loginValid = this.loginRegex.test(this.loginValue);
    if (!loginValid) {
      this.children.InputLogin.setProps({
        error: 'Неверный логин - проверка из кнопки',
      });
    } else {
      this.children.InputLogin.setProps({
        error: '',
      });
    }

    const passwordValid = this.passwordRegex.test(this.passwordValue);
    if (!passwordValid) {
      this.children.LoginPassword.setProps({
        error: 'Неверный пароль - проверка из кнопки',
      });
    } else {
      this.children.LoginPassword.setProps({
        error: '',
      });
    }

    if (loginValid && passwordValid) {
      console.log({
        Login: this.loginValue,
        Password: this.passwordValue,
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
