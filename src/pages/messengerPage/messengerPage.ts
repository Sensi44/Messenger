import Block from '../../modules/block';
import { connect } from '../../modules/store/connect.ts';
import { ChatWindow, ChatList, Input, Link, AddDeleteUserModal, Button } from '../../components';
import { chatListContext } from './messangerContext.ts';
import { createChat, getChats } from '../../services/Chats.ts';

import type { StoreState } from '../../modules/store/store.types.ts';
import type { TChat } from '../../modules/store/store.types.ts';
import type { TUser } from '../../types/commonTypes.ts';
// import isEqual from '../../utils/isEqual.ts';

type MessengerPageProps = {
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  chats: TChat[];
  user: TUser | null;
};

type MessengerChildren = {
  createChatInput: Input;
  createChatButton: Button;
  profileLink: Link;
  searchInput: Input;
  chatList: ChatList;
  chatWindow: ChatWindow;
  addDeleteUserModal: AddDeleteUserModal;
};

class MessengerPage extends Block<Partial<MessengerPageProps>, Partial<MessengerChildren>> {
  chatNameValue = '';

  init() {
    const updateFuncBind = this.updateFunc.bind(this);
    const onOpenModalBind = this.onOpenModal.bind(this);
    const onCreateChatBind = this.createChat.bind(this);
    const onChangeInputBind = this.onChangeInput.bind(this);

    const createChatInput = new Input({
      name: 'chatName',
      label: 'Введите имя чата',
      labelClass: 'messengerPage__chatName',
      onChange: onChangeInputBind,
    });
    const createChatButton = new Button({
      label: 'Создать',
      type: 'primary',
      submit: onCreateChatBind,
    });
    const profileLink = new Link({ url: '/profile', text: 'Профиль', class: 's' });
    const searchInput = new Input({
      name: 'search',
      label: 'Поиск',
      labelClass: 'messengerPage__search',
    });

    const chatList = new ChatList({
      chats: this.props.chats,
      updateFunc: updateFuncBind,
    });

    const chatWindow = new ChatWindow({
      currentChat: [],
      userData: {
        name: 'Я',
        avatar: 'src/assets/img/1.png',
      },
      openModal: onOpenModalBind,
    });
    const addDeleteUserModal = new AddDeleteUserModal({
      isOpen: false,
      addUser: true,
    });

    this.children = {
      ...this.children,
      createChatInput,
      createChatButton,
      profileLink,
      searchInput,
      chatList,
      chatWindow,
      addDeleteUserModal,
    };

    this.setProps({
      ...this.props,
    });
  }

  componentDidUpdate(oldProps: Partial<MessengerPageProps>, newProps: Partial<MessengerPageProps>): boolean {
    if (oldProps.chats?.length !== newProps.chats?.length) {
      this.children.chatList?.setProps({
        chats: newProps.chats,
      });
      return true;
    }

    return false;
  }

  onOpenModal(show: boolean, mode: boolean) {
    this.children.addDeleteUserModal?.setProps({
      isOpen: show,
      addUser: mode,
    });
  }

  onChangeInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    this.chatNameValue = input.value;
  }

  createChat() {
    if (this.chatNameValue.length > 3) {
      console.log(this.chatNameValue, 'Создаём чат');
    }
    createChat(this.chatNameValue);
  }

  updateFunc(num: number) {
    const currentName = chatListContext[num].name || '';
    const currentAvatar = chatListContext[num].img || '';
    const currentChat = chatListContext[num].chat || [];
    this.children.chatWindow?.setProps({
      currentChat: currentChat,
      userData: {
        name: currentName,
        avatar: currentAvatar,
      },
    });
  }

  render() {
    // console.log('messProps -', this.props);
    return `
      <main class="messengerPage basePage">
        <nav class="messengerPage__aside chatList">
          <div class="chatList__header">
          <div class="chatList__createChat">
            {{{createChatInput}}}
            {{{createChatButton}}}
          </div>
            {{{ profileLink }}}
            {{{ searchInput }}}
          </div>
          
          {{{ chatList }}}
        </nav>
       {{{ chatWindow }}}
       
       {{{ addDeleteUserModal }}}
      </main>
    `;
  }
}

const mapStateToProps = (state: StoreState): MessengerPageProps => ({
  isLoading: state.isLoading,
  error: state.error,
  user: state.user,
  chats: state.chats,
  isOpen: false,
});

export default connect(mapStateToProps)(MessengerPage);
