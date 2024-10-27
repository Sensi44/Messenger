import Block from '../../modules/block';
import { Button } from '../../components';

type ChatWindowNavProps = {
  name: string;
  avatar: string;
  isOpen: boolean;
  openModal: (show: boolean, mode: boolean) => void;
};
type ChatWindowNavChildren = {
  settingButton: Button;
  addUserButton: Button;
  deleteUserButton: Button;
};

class ChatWindowNav extends Block<ChatWindowNavProps, Partial<ChatWindowNavChildren>> {
  init() {
    const onOpenModalBind = this.onOpenModal.bind(this);
    const onAddUserBind = this.onAddUser.bind(this);
    const onDeleteUserBind = this.onDeleteUser.bind(this);

    const settingButton = new Button({
      className: 'chatWindow__settingsButton',
      submit: onOpenModalBind,
    });

    const addUserButton = new Button({
      label: 'Добавить пользователя',
      type: 'text',
      className: 'settingsMenu__add',
      submit: onAddUserBind,
    });

    const deleteUserButton = new Button({
      label: 'Удалить пользователя',
      type: 'text',
      className: 'settingsMenu__delete',
      submit: onDeleteUserBind,
    });

    this.children = {
      ...this.children,
      settingButton,
      addUserButton,
      deleteUserButton,
    };
  }

  onOpenModal() {
    this.setProps({
      isOpen: !this.props.isOpen,
    });
  }

  onAddUser() {
    this.props.openModal(true, true);
  }

  onDeleteUser() {
    this.props.openModal(true, false);
  }

  handleClickOutside(e: MouseEvent) {
    const target = e.target as HTMLElement;

    if (target) {
      const isSettingButton = target.closest('.chatWindow__settingsButton');

      if (!isSettingButton && this.props.isOpen) {
        this.setProps({
          isOpen: false,
        });
      }
    }
  }

  addEvents() {
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }

  removeEvents() {
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }

  render() {
    return `
      <div class="chatWindow__navigate">
        <div class="chatWindow__companionProfile">
          <img src={{avatar}} class="messengerPage__avatar" alt="аватар пользователя" />
          {{ name }}
        </div>
        <div class="chatWindow__setting">
          {{{ settingButton }}}
          
          {{#if isOpen}}
            <div class="chatWindow__settingsMenu settingsMenu">
              {{{ addUserButton }}}
              {{{ deleteUserButton }}}
            </div>
          {{/if}}
        </div>
      </div>
    `;
  }
}

export default ChatWindowNav;
