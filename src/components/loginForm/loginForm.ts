import Block from '../../modules/block';
import { Button, Input, Link } from '../../components';

import type { TLoginRequestData } from '../../api/type.ts';

type LoginFormProps = {
  name: string;
  isLoading: boolean;
  onSubmit: (data: TLoginRequestData) => Promise<void>;
};
type LoginFormChildren = {
  InputLogin: Input;
  LoginPassword: Input;
  LoginButton: Button;
  HomeLink: Link;
};

class LoginForm extends Block<Partial<LoginFormProps>, Partial<LoginFormChildren>> {
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
      submit: onSubmitButtonBind,
    });
    const HomeLink = new Link({
      url: '/sign-up',
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
        this.children.InputLogin?.setProps({ error: 'Неверный логин' });
      } else {
        this.children.InputLogin?.setProps({ error: '' });
      }
    }
  }

  onBlurPassword(e: FocusEvent) {
    if (!this.isSubmitting) {
      const input = e.target as HTMLInputElement;
      const inputValue = input.value;

      if (!this.passwordRegex.test(inputValue)) {
        this.children.LoginPassword?.setProps({ error: 'Неверный пароль' });
      } else {
        this.children.LoginPassword?.setProps({ error: '' });
      }
    }
  }

  onSubmitButton(e: MouseEvent) {
    e.preventDefault();
    this.isSubmitting = true;
    const loginValid = this.loginRegex.test(this.loginValue);
    if (!loginValid) {
      this.children.InputLogin?.setProps({ error: 'Неверный логин - проверка из кнопки' });
    } else {
      this.children.InputLogin?.setProps({ error: '' });
    }

    const passwordValid = this.passwordRegex.test(this.passwordValue);
    if (!passwordValid) {
      this.children.LoginPassword?.setProps({ error: 'Неверный пароль - проверка из кнопки' });
    } else {
      this.children.LoginPassword?.setProps({ error: '' });
    }

    if (loginValid && passwordValid) {
      if (this.props.onSubmit) {
        this.props
          .onSubmit({
            login: this.loginValue,
            password: this.passwordValue,
          })
          .catch((err) => {
            console.error(err);
          });
      }

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
        {{#if error}}
          <h4>{{error}}</h4>
        {{/if}}
        
        <div class="viForm__body">
          {{{ InputLogin }}}
          {{{ LoginPassword }}}
        </div>
        
        <div class="viForm__actions">
            {{#if isLoading}}
              <h2>Загрузка...</h2>
            {{else}}
              {{{ LoginButton }}}
            {{/if}}
            {{{ HomeLink }}}
        </div>
      </form>
    `;
  }
}

export default LoginForm;
