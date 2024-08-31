import Block from '../../modules/block.ts';
import { Input, Button } from '../../components';

type EditPasswordFormProps = {};
type EditPasswordFormChildren = {
  oldPassword: Input;
  newPassword: Input;
  reNewPassword: Input;
  submitButton: Button;
};

class EditPasswordForm extends Block<EditPasswordFormProps, Partial<EditPasswordFormChildren>> {
  formFields: Record<string, string>;
  errors: Record<string, string>;
  regex: Record<string, RegExp>;
  isSubmitting = false;

  constructor(props: EditPasswordFormProps & Partial<EditPasswordFormChildren>) {
    super(props);
    this.formFields = {
      oldPassword: '',
      newPassword: '',
      rePassword: '',
    };

    this.errors = {
      oldPassword: 'пароль не мог иметь такой формат',
      newPassword: 'Неверный формат пароля',
      rePassword: 'Пароли не совпадают',
    };

    this.regex = {
      newPassword: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      oldPassword: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    };
  }

  init() {
    const onBlurBind = this.onBlur.bind(this);
    const onChangeInputBind = this.onChangeInput.bind(this);
    const onBlurRePasswordBind = this.onBlurRePassword.bind(this);
    const onSubmitButtonBind = this.onSubmitButton.bind(this);

    const oldPassword = new Input({
      name: 'oldPassword',
      label: 'Старый пароль',
      type: 'password',
      dataName: 'oldPassword',
      blur: onBlurBind,
      onChange: onChangeInputBind,
      value: '',
    });

    const newPassword = new Input({
      name: 'newPassword',
      label: 'Новый пароль',
      type: 'password',
      dataName: 'newPassword',
      blur: onBlurBind,
      onChange: onChangeInputBind,
      value: '',
    });

    const reNewPassword = new Input({
      name: 'newPassword',
      label: 'Повторите новый пароль',
      type: 'password',
      dataName: 'rePassword',
      blur: onBlurRePasswordBind,
      onChange: onChangeInputBind,
    });

    const submitButton = new Button({
      label: 'Сохранить',
      type: 'primary',
      submit: onSubmitButtonBind,
    });

    this.children = {
      ...this.children,
      oldPassword,
      newPassword,
      reNewPassword,
      submitButton,
    };
  }

  onChangeInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    const inputName = input.dataset.name;

    if (inputName) {
      this.formFields[inputName] = input.value;
    }
  }

  onBlur(e: FocusEvent) {
    if (!this.isSubmitting) {
      const input = e.target as HTMLInputElement;
      const inputValue = input.value;
      const inputName = input.name;
      const inputRegex = this.regex[inputName];
      const inputDataName = input.dataset.name || '';
      const elem = this.children[inputDataName as keyof EditPasswordFormChildren];

      if (!inputRegex.test(inputValue)) {
        elem?.setProps({ error: this.errors[inputName] });
      } else {
        elem?.setProps({ error: '' });
      }

      console.log(this.formFields);
    }
  }

  onBlurRePassword(e: FocusEvent) {
    const input = e.target as HTMLInputElement;

    if (this.formFields.newPassword !== input.value) {
      this.children.reNewPassword?.setProps({ error: this.errors.rePassword });
    } else {
      this.children.reNewPassword?.setProps({ error: '' });
    }
  }

  onSubmitButton(e: MouseEvent) {
    e.preventDefault();
    this.isSubmitting = true;

    let hasErrors = false;

    for (const inputName in this.regex) {
      const inputValue = this.formFields[inputName];
      const inputRegex = this.regex[inputName];
      const elem = this.children[inputName as keyof EditPasswordFormChildren];

      if (inputRegex) {
        if (!inputRegex.test(inputValue)) {
          elem?.setProps({ error: this.errors[inputName] + '!!' });
          hasErrors = true;
        } else {
          elem?.setProps({ error: '' });
        }
      }
    }

    if (this.formFields.newPassword !== this.formFields.rePassword) {
      this.children.reNewPassword?.setProps({ error: this.errors.rePassword + '!!' });
      hasErrors = true;
    } else {
      this.children.reNewPassword?.setProps({ error: '' });
    }

    if (hasErrors) {
      return;
    }

    this.isSubmitting = false;

    console.log('Отправка формы', this.formFields);
  }

  render() {
    return `
      <div>
        {{{ oldPassword }}}
        {{{ newPassword }}}
        {{{ reNewPassword }}}
        {{{ submitButton }}}
      </div>
    `;
  }
}

export default EditPasswordForm;
