import Block from '../../modules/block.ts';
import { Input, Button } from '../../components';

// import type { IAddDeleteUserModalProps } from './addDeleteUserModal.props.ts';

type AddDeleteUserModalProps = {
  isOpen: boolean;
  addUser: boolean;
};

export type TAddDeleteUserModalPropsKeys = keyof AddDeleteUserModalProps;

type AddDeleteUserModalChildren = {
  userInput: Input;
  submitButton: Button;
  closeButton: Button;
};

class AddDeleteUserModal extends Block<AddDeleteUserModalProps, Partial<AddDeleteUserModalChildren>> {
  userName: string;

  constructor(props: AddDeleteUserModalProps & Partial<AddDeleteUserModalChildren>) {
    super(props);
    this.userName = '';
  }

  init() {
    const onChangeInputBind = this.onChangeInput.bind(this);
    const onSubmitButtonBind = this.onSubmitButton.bind(this);
    const onCloseButtonBind = this.onCloseButton.bind(this);

    const userInput = new Input({
      name: 'login',
      label: 'Логин',
      dataName: 'login',
      labelClass: 'addUserModal__input',
      onChange: onChangeInputBind,
    });

    const submitButton = new Button({
      label: this.props.addUser ? 'Добавить пользователя' : 'Удалить пользователя',
      type: 'primary',
      submit: onSubmitButtonBind,
    });

    const closeButton = new Button({
      label: 'X',
      type: 'close',
      submit: onCloseButtonBind,
    });

    this.children = {
      ...this.children,
      userInput,
      submitButton,
      closeButton,
    };
  }

  componentDidUpdate(oldProps: AddDeleteUserModalProps, newProps: AddDeleteUserModalProps): boolean {
    for (const propKey in newProps) {
      const key = propKey as TAddDeleteUserModalPropsKeys;

      if (oldProps[key] !== newProps[key]) {
        this.children.submitButton?.setProps({
          label: newProps.addUser ? 'Добавить пользователя' : 'Удалить пользователя',
        });
        return true;
      }
    }

    return false;
  }

  onChangeInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;

    if (input) {
      this.userName = input.value;
    }
    console.log(this.userName);
  }

  onSubmitButton(e: MouseEvent) {
    e.preventDefault();
    console.log(this.props.addUser, '?');

    console.log('Запрос на добавление / удаление', this.userName);
  }

  onCloseButton() {
    this.setProps({
      isOpen: false,
    });
  }

  render() {
    return `
    {{#if isOpen}}
      <dialog class="viModal addUserModal {{isOpen}}">
      {{{closeButton}}}
        {{#if addUser}}
          {{#Typography style="text-l"}}Добавить пользователя{{/Typography}}
        {{else}}
          {{#Typography style="text-l"}}Удалить пользователя{{/Typography}}
        {{/if}}
        
        <form>
          {{{ userInput }}}
          {{{ submitButton }}}
        </form>
      </dialog>
    {{else}}
    <div></div>
    {{/if}}
  `;
  }
}

export default AddDeleteUserModal;
