import Block from '../../modules/block';
import { Button, AddDeleteUserModal } from '../../components';

import type { IChatWindowNavProps } from './chatWindow.props.ts';

class ChatWindowNav extends Block<IChatWindowNavProps> {
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
      submit: onAddUserBind,
    });

    const deleteUserButton = new Button({
      label: 'Удалить пользователя',
      type: 'text',
      submit: onDeleteUserBind,
    });

    const addDeleteUserModal = new AddDeleteUserModal({});

    this.children = {
      ...this.children,
      settingButton,
      addUserButton,
      deleteUserButton,
      addDeleteUserModal,
    };
  }

  onOpenModal() {
    this.setProps({
      isOpen: !this.props.isOpen,
    });
  }

  onAddUser() {
    console.log('add user');
  }

  onDeleteUser() {
    console.log('delete user');
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
            <div class="chatWindow__settingsMenu">
              {{{ addUserButton }}}
              {{{ deleteUserButton }}}
            </div>
          {{/if}}
        </div>
        
        {{{ addDeleteUserModal }}}
      </div>
    `;
  }
}

export default ChatWindowNav;
