import Block from '../../modules/block';
import { Input, Button, Link } from '../../components';
import { create } from '../../services/auth.ts';

import type { TCreateRequestData } from '../../api/type.ts';

type SignInFormProps = {
  name: string;
};
type SignInFormChildren = {
  email: Input;
  login: Input;
  first_name: Input;
  second_name: Input;
  phone: Input;
  password: Input;
  rePassword: Input;
  SignInButton: Button;
  HomeLink: Link;
};

class SignInForm extends Block<SignInFormProps, SignInFormChildren> {
  formFields: TCreateRequestData;
  errors: Record<string, string>;
  regex: Record<string, RegExp>;
  isSubmitting = false;

  constructor(props: SignInFormProps & Partial<SignInFormChildren>) {
    super(props);
    this.formFields = {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      phone: '',
      password: '',
      rePassword: '',
    };
    this.errors = {
      email: 'Неверный формат',
      login: 'Неверный логин',
      first_name: 'Неверный формат',
      second_name: 'Неверный формат',
      phone: 'Неверный формат',
      password: 'Неверный пароль',
      rePassword: 'Пароли не совпадают',
    };
    this.regex = {
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      login: /^(?!.*[_.-]{2})[a-zA-Z][a-zA-Z0-9_.-]{2,19}$/,
      first_name: /^[A-ZА-ЯЁ][a-zA-Zа-яё-]*$/,
      second_name: /^[A-ZА-ЯЁ][a-zA-Zа-яё-]*$/,
      phone: /^\+?\d{10,15}$/,
      password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    };
  }

  init() {
    const onBlurBind = this.onBlur.bind(this);
    const onChangeInputBind = this.onChangeInput.bind(this);
    const onBlurRePasswordBind = this.onBlurRePassword.bind(this);
    const onSubmitButtonBind = this.onSubmitButton.bind(this);

    const email = new Input({
      name: 'email',
      label: 'Почта',
      dataName: 'email',
      blur: onBlurBind,
      onChange: onChangeInputBind,
    });

    const login = new Input({
      name: 'login',
      label: 'Логин',
      dataName: 'login',
      blur: onBlurBind,
      onChange: onChangeInputBind,
    });

    const first_name = new Input({
      name: 'first_name',
      label: 'Имя',
      dataName: 'first_name',
      blur: onBlurBind,
      onChange: onChangeInputBind,
    });

    const second_name = new Input({
      name: 'second_name',
      label: 'Фамилия',
      dataName: 'second_name',
      blur: onBlurBind,
      onChange: onChangeInputBind,
    });

    const phone = new Input({
      name: 'phone',
      label: 'Телефон',
      dataName: 'phone',
      blur: onBlurBind,
      onChange: onChangeInputBind,
    });

    const password = new Input({
      name: 'password',
      label: 'Пароль',
      type: 'password',
      dataName: 'password',
      blur: onBlurBind,
      onChange: onChangeInputBind,
    });

    const rePassword = new Input({
      name: 'password',
      label: 'Пароль ещё раз',
      type: 'password',
      dataName: 'rePassword',
      blur: onBlurRePasswordBind,
      onChange: onChangeInputBind,
    });

    const SignInButton = new Button({
      label: 'Авторизоваться',
      type: 'primary',
      submit: onSubmitButtonBind,
    });

    const HomeLink = new Link({
      url: '/',
      class: 'home homeButton',
      text: 'войти',
    });

    this.children = {
      ...this.children,
      email,
      login,
      first_name,
      second_name,
      phone,
      password,
      rePassword,
      SignInButton,
      HomeLink,
    };
  }

  onSubmitButton(e: MouseEvent) {
    e.preventDefault();
    this.isSubmitting = true;

    let hasErrors = false;

    for (const inputName in this.regex) {
      const inputValue = this.formFields[inputName as keyof TCreateRequestData];
      const inputRegex = this.regex[inputName];
      const elem = this.children[inputName as keyof SignInFormChildren];

      if (inputRegex) {
        if (!inputRegex.test(inputValue)) {
          elem?.setProps({ error: this.errors[inputName] + '!!' });
          hasErrors = true;
        } else {
          elem?.setProps({ error: '' });
        }
      }
    }

    if (this.formFields.password !== this.formFields.rePassword) {
      this.children.rePassword?.setProps({ error: this.errors.rePassword + '!!' });
      hasErrors = true;
    } else {
      this.children.rePassword?.setProps({ error: '' });
    }

    this.isSubmitting = false;

    if (hasErrors) {
      return;
    }

    create({ ...this.formFields }).catch((err) => {
      console.error(err);
    });
    console.log('Отправка формы', this.formFields);
  }

  onChangeInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    const inputName = input.dataset.name as keyof TCreateRequestData;

    if (inputName) {
      this.formFields[inputName] = input.value;
    }
  }

  onBlur(e: FocusEvent) {
    if (!this.isSubmitting) {
      const input = e.target as HTMLInputElement;
      const inputValue = input.value;
      const inputName = input.name as keyof TCreateRequestData;
      const inputRegex = this.regex[inputName];
      const inputDataName = input.dataset.name || '';
      const elem = this.children[inputDataName as keyof SignInFormChildren];

      if (!inputRegex.test(inputValue)) {
        elem?.setProps({ error: this.errors[inputName] });
      } else {
        elem?.setProps({ error: '' });
      }

      console.log(this.formFields);
    }
  }

  onBlurRePassword(e: FocusEvent) {
    if (!this.isSubmitting) {
      const input = e.target as HTMLInputElement;

      if (this.formFields.password !== input.value) {
        this.children.rePassword?.setProps({ error: this.errors.rePassword });
      } else {
        this.children.rePassword?.setProps({ error: '' });
      }
    }
  }

  render(): string {
    return `
      <form class="viForm">
        <h2>{{name}}</h2>
        
        <div class="viForm__body">
          {{{ email }}}
          {{{ login }}}
          {{{ first_name }}}
          {{{ second_name }}}
          {{{ phone }}}
          {{{ password }}}
          {{{ rePassword }}}
        </div>
       
        <div class="viForm__actions">
            {{{ SignInButton }}}
            {{{ HomeLink }}}
        </div>
      </form>
    `;
  }
}

export default SignInForm;
