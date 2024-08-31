import Block, { BlockProps } from '../../modules/block';
import { ChatWindow, ChatList, Input, Link, AddDeleteUserModal } from '../../components';
import { chatListContext } from './messangerContext.ts';

class MessengerPage extends Block {
  constructor(props: BlockProps<unknown>) {
    super(props);
  }

  init() {
    const updateFuncBind = this.updateFunc.bind(this);
    const onOpenModalBind = this.onOpenModal.bind(this);

    const profileLink = new Link({ url: 'profile', text: 'Профиль', class: 's' });
    const searchInput = new Input({
      name: 'search',
      label: 'Поиск',
      labelClass: 'messengerPage__search',
    });
    const chatList = new ChatList({
      chats: chatListContext,
      updateFunc: updateFuncBind as () => void,
    });
    const chatWindow = new ChatWindow({
      currentChat: [],
      userData: {
        name: 'Я',
        avatar: 'src/assets/img/1.png',
      },
      openModal: onOpenModalBind as () => void,
    });

    const addDeleteUserModal = new AddDeleteUserModal({
      isOpen: false,
      addUser: true,
    });

    this.children = {
      ...this.children,
      profileLink,
      searchInput,
      chatList,
      chatWindow,
      addDeleteUserModal,
    };
  }

  onOpenModal(show: boolean, mode: boolean) {
    (this.children.addDeleteUserModal as Input).setProps({
      isOpen: show,
      addUser: mode,
    });
  }

  updateFunc(num: number) {
    const currentName = chatListContext[num].name || '';
    const currentAvatar = chatListContext[num].img || '';
    const currentChat = chatListContext[num].chat || [];
    (this.children.chatWindow as Input).setProps({
      currentChat: currentChat,
      userData: {
        name: currentName,
        avatar: currentAvatar,
      },
    });
  }

  render() {
    return `
      <main class="messengerPage basePage">
        <nav class="messengerPage__aside chatList">
          <div class="chatList__header">
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

export default MessengerPage;
