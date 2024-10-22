import Block from '../../modules/block';
import { Input, Button } from '../../components';

import type { TUser } from '../../types/commonTypes.ts';
import isEqual from '../../utils/isEqual.ts';

type EditDataFormProps = {
  user: TUser | null | undefined;
};

type EditDataFormChildren = {
  mail: Input;
  login: Input;
  first_name: Input;
  second_name: Input;
  display_name: Input;
  phone: Input;
  SubmitButton: Button;
};

class EditDataForm extends Block<EditDataFormProps, Partial<EditDataFormChildren>> {
  formFields: Record<string, string>;
  errors: Record<string, string>;
  regex: Record<string, RegExp>;
  isSubmitting = false;
  initFormData: TUser | null | undefined;

  constructor(props: EditDataFormProps & Partial<EditDataFormChildren>) {
    super(props);
    this.formFields = {
      mail: '',
      login: '',
      first_name: '',
      second_name: '',
      display_name: '',
      phone: '',
    };
    this.errors = {
      mail: 'Неверный формат',
      login: 'Неверный логин',
      first_name: 'Неверный формат',
      second_name: 'Неверный формат',
      display_name: 'Некорректное имя',
      phone: 'Неверный формат',
    };
    this.regex = {
      mail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      login: /^(?!.*[_.-]{2})[a-zA-Z][a-zA-Z0-9_.-]{2,19}$/,
      first_name: /^[A-ZА-ЯЁ][a-zA-Zа-яё-]*$/,
      second_name: /^[A-ZА-ЯЁ][a-zA-Zа-яё-]*$/,
      display_name: /^[A-ZА-ЯЁ][a-zA-Zа-яё-]*$/,
      phone: /^\+?\d{10,15}$/,
    };
  }

  init() {
    const onBlurBind = this.onBlur.bind(this);
    const onChangeInputBind = this.onChangeInput.bind(this);
    const onSubmitButtonBind = this.onSubmitButton.bind(this);
    this.initFormData = this.props.user;
    const mail = new Input({
      name: 'mail',
      label: this.props.user?.email,
      addPlaceHolder: 'Почта',
      dataName: 'mail',
      value: this.props.user?.email,
      blur: onBlurBind,
      onChange: onChangeInputBind,
    });

    const login = new Input({
      name: 'login',
      label: this.props.user?.login,
      addPlaceHolder: 'Логин',
      dataName: 'login',
      value: '',
      blur: onBlurBind,
      onChange: onChangeInputBind,
    });

    const first_name = new Input({
      name: 'first_name',
      label: this.props.user?.firstName,
      addPlaceHolder: 'Имя',
      dataName: 'first_name',
      value: this.props.user?.firstName,
      blur: onBlurBind,
      onChange: onChangeInputBind,
    });

    const second_name = new Input({
      name: 'second_name',
      label: this.props.user?.secondName,
      addPlaceHolder: 'Фамилия',
      dataName: 'second_name',
      value: this.props.user?.secondName,
      blur: onBlurBind,
      onChange: onChangeInputBind,
    });

    const display_name = new Input({
      name: 'display_name',
      label: this.props.user?.displayName,
      dataName: 'display_name',
      addPlaceHolder: 'Имя в чате',
      value: this.props.user?.displayName,
      blur: onBlurBind,
      onChange: onChangeInputBind,
    });

    const phone = new Input({
      name: 'phone',
      label: this.props.user?.phone,
      dataName: 'phone',
      addPlaceHolder: 'Телефон',
      value: this.props.user?.phone,
      blur: onBlurBind,
      onChange: onChangeInputBind,
    });

    const SubmitButton = new Button({
      label: 'Сохранить',
      type: 'primary',
      submit: onSubmitButtonBind,
    });

    this.children = {
      ...this.children,
      mail,
      login,
      first_name,
      second_name,
      display_name,
      phone,
      SubmitButton,
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.formFields = {
      mail: this.children.mail?.props.value || '',
      login: this.children.login?.props.value || '',
      first_name: this.children.first_name?.props.value || '',
      second_name: this.children.second_name?.props.value || '',
      display_name: this.children.display_name?.props.value || '',
      phone: this.children.phone?.props.value || '',
    };
  }

  onSubmitButton(e: MouseEvent) {
    e.preventDefault();
    this.isSubmitting = true;

    let hasErrors = false;

    for (const inputName in this.regex) {
      const inputValue = this.formFields[inputName];
      const inputRegex = this.regex[inputName];

      if (inputRegex) {
        if (!inputRegex.test(inputValue)) {
          this.children[inputName as keyof EditDataFormChildren]?.setProps({
            error: this.errors[inputName] + 'с кнопки',
          });
          hasErrors = true;
        } else {
          this.children[inputName as keyof EditDataFormChildren]?.setProps({ error: '' });
        }
      }
    }

    this.isSubmitting = false;

    if (hasErrors) {
      return;
    }

    console.log('Отправка формы', this.formFields);
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

      if (!inputRegex.test(inputValue)) {
        console.log(111);
        this.children[inputDataName as keyof EditDataFormChildren]?.setProps({ error: this.errors[inputName] });
      } else {
        console.log(222);
        this.children[inputDataName as keyof EditDataFormChildren]?.setProps({ error: '' });
      }

      console.log(this.formFields);
    }
  }

  componentDidUpdate(oldProps: EditDataFormProps, newProps: EditDataFormProps): boolean {
    if (!isEqual(oldProps, newProps)) {
      this.setProps(newProps);
      return true;
    }
    return false;
  }

  render() {
    console.log('editDataForm - props: ', this.props);
    console.log('this.initFormData ', this.initFormData);
    return `
      <div>
          {{{ mail }}}
          {{{ login }}}
          {{{ first_name }}}
          {{{ second_name }}}
          {{{ display_name }}}
          {{{ phone }}}

          {{{ SubmitButton }}}
      </div>
    `;
  }
}

export default EditDataForm;
