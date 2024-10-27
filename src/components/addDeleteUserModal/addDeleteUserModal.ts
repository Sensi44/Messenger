import Block from '../../modules/block.ts';
import { Input, Button } from '../../components';
import { connect } from '../../modules/store/connect.ts';
import { searchUser, addUsersToChat, deleteUserFromChat } from '../../services/Chats.ts';

import type { StoreState } from '../../modules/store/store.types.ts';

type AddDeleteUserModalProps = {
  isOpen?: boolean;
  addUser?: boolean;
  userId?: number;
  selectedChatId?: number;
  isLoading?: boolean;
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
  }

  async onSubmitButton(e: MouseEvent) {
    e.preventDefault();

    const usersArray = await searchUser(this.userName);
    const userIds = usersArray.map((user) => user.id);

    console.log('userIds', userIds);
    console.log('this.props.selectedChatId', this.props.selectedChatId);

    if (this.props.addUser) {
      if (userIds.length > 0 && this.props.selectedChatId) {
        addUsersToChat(userIds, this.props.selectedChatId).then(() => {
          this.setProps({
            ...this.props,
            isOpen: false,
          });
          console.log('Пользователь успешно добавлен');
        });
      }
    } else {
      if (userIds.length > 0 && this.props.selectedChatId) {
        deleteUserFromChat(userIds, this.props.selectedChatId).then(() => {
          this.setProps({
            ...this.props,
            isOpen: false,
          });
          console.log('Пользователь удалён добавлен');
        });
      }
    }

    // console.log('Запрос на добавление / удаление', this.userName);
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
        
        {{#if isLoading}}
          <span>Загрузка...</span>
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

const mapStateToProps = (state: StoreState) => ({
  isLoading: state.isLoading,
  userId: state.user?.id,
  selectedChatId: state.selectedChatId,
});

export default connect(mapStateToProps)(AddDeleteUserModal);
