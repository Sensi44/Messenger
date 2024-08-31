import Block from '../../modules/block';
import { Input, Button } from '../../components';

type EditDataFormProps = {};
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

    const mail = new Input({
      name: 'mail',
      label: 'Почта',
      dataName: 'mail',
      value: 'pochta@yandex.ru',
      blur: onBlurBind,
      onChange: onChangeInputBind,
    });

    const login = new Input({
      name: 'login',
      label: 'Логин',
      dataName: 'login',
      value: 'ivanivanov',
      blur: onBlurBind,
      onChange: onChangeInputBind,
    });

    const first_name = new Input({
      name: 'first_name',
      label: 'Имя',
      dataName: 'first_name',
      value: 'Иван',
      blur: onBlurBind,
      onChange: onChangeInputBind,
    });

    const second_name = new Input({
      name: 'second_name',
      label: 'Фамилия',
      dataName: 'second_name',
      value: 'Иванов',
      blur: onBlurBind,
      onChange: onChangeInputBind,
    });

    const display_name = new Input({
      name: 'display_name',
      label: 'Имя в чате',
      dataName: 'display_name',
      value: 'Иванюшечка',
      blur: onBlurBind,
      onChange: onChangeInputBind,
    });

    const phone = new Input({
      name: 'phone',
      label: 'Телефон',
      dataName: 'phone',
      value: '+79099673030',
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

  componentDidMount(oldProps: object) {
    super.componentDidMount(oldProps);
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

    if (hasErrors) {
      return;
    }

    this.isSubmitting = false;

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
        this.children[inputDataName as keyof EditDataFormChildren]?.setProps({ error: this.errors[inputName] });
      } else {
        this.children[inputDataName as keyof EditDataFormChildren]?.setProps({ error: '' });
      }

      console.log(this.formFields);
    }
  }

  render(): string {
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
