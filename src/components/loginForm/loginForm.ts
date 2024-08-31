import Block from '../../modules/block';
import { Button, Input, Link } from '../../components';

class LoginForm extends Block {
  loginValue = '';
  passwordValue = '';
  loginRegex = /^(?!.*[_.-]{2})[a-zA-Z][a-zA-Z0-9_.-]{2,19}$/;
  passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
  isSubmitting = false;

  init() {
    const onBlurLoginBind = this.onBlurLogin.bind(this);
    const onBlurPasswordBind = this.onBlurPassword.bind(this);
    const onChangeInputBind = this.onChangeInput.bind(this);
    const onSubmitButtonBind = this.onSubmitButton.bind(this);

    const InputLogin = new Input({
      name: 'login',
      label: 'Логин',
      blur: onBlurLoginBind,
      onChange: onChangeInputBind,
    });
    const LoginPassword = new Input({
      name: 'password',
      label: 'Пароль',
      type: 'password',
      blur: onBlurPasswordBind,
      onChange: onChangeInputBind,
    });
    const LoginButton = new Button({
      label: 'Авторизоваться',
      type: 'primary',
      submit: onSubmitButtonBind as () => void,
    });
    const HomeLink = new Link({
      url: 'signInPage',
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

  onChangeInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    if (input.name === 'login') {
      this.loginValue = input.value;
    } else {
      this.passwordValue = input.value;
    }
  }

  onBlurLogin(e: FocusEvent) {
    if (!this.isSubmitting) {
      const input = e.target as HTMLInputElement;
      const inputValue = input.value;

      if (!this.loginRegex.test(inputValue)) {
        (this.children.InputLogin as Input).setProps({ error: 'Неверный логин' });
      } else {
        (this.children.InputLogin as Input).setProps({ error: '' });
      }
    }
  }

  onBlurPassword(e: FocusEvent) {
    if (!this.isSubmitting) {
      const input = e.target as HTMLInputElement;
      const inputValue = input.value;

      if (!this.passwordRegex.test(inputValue)) {
        (this.children.LoginPassword as Input).setProps({ error: 'Неверный пароль' });
      } else {
        (this.children.LoginPassword as Input).setProps({ error: '' });
      }
    }
  }

  onSubmitButton(e: MouseEvent) {
    e.preventDefault();
    this.isSubmitting = true;
    const loginValid = this.loginRegex.test(this.loginValue);
    if (!loginValid) {
      console.log(this.children.InputLogin);
      (this.children.InputLogin as Input).setProps({ error: 'Неверный логин - проверка из кнопки' });
    } else {
      (this.children.InputLogin as Input).setProps({ error: '' });
    }

    const passwordValid = this.passwordRegex.test(this.passwordValue);
    if (!passwordValid) {
      (this.children.LoginPassword as Input).setProps({ error: 'Неверный пароль - проверка из кнопки' });
    } else {
      (this.children.LoginPassword as Input).setProps({ error: '' });
    }

    if (loginValid && passwordValid) {
      console.log({
        Login: this.loginValue,
        Password: this.passwordValue,
      });
    }
    this.isSubmitting = false;
  }

  render(): string {
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
