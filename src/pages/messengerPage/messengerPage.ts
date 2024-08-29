import Block from '../../modules/block';
import { ChatWindow, ChatList, Input, Link, AddDeleteUserModal } from '../../components';
import { chatListContext } from './messangerContext.ts';

class MessengerPage extends Block<object> {
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
      updateFunc: updateFuncBind,
    });
    const chatWindow = new ChatWindow({
      currentChat: 'Выберите чат',
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
      profileLink,
      searchInput,
      chatList,
      chatWindow,
      addDeleteUserModal,
    };

    // this.props = {
    //   ...this.props,
    //   // currentChat: [1, 2, 3],
    // };
  }

  onOpenModal(show: boolean, mode: boolean) {
    console.log('?');
    this.children.addDeleteUserModal.setProps({
      isOpen: show,
      addUser: mode,
    });
  }

  updateFunc(num: number) {
    const currentName = chatListContext[num].name || '';
    const currentAvatar = chatListContext[num].img || '';
    this.children.chatWindow.setProps({
      currentChat: `чат - ${num}`,
      userData: {
        name: currentName,
        avatar: currentAvatar,
      },
    });
  }

  // componentDidMount(oldProps) {
  //   // console.log(this.props.currentChat);
  //   this.children.chatWindow.setProps({
  //     ...oldProps,
  //     currentChat: this.props.currentChat,
  //   });
  // }

  // componentDidMount(oldProps, newProps): boolean {
  //   console.log(oldProps, newProps);
  //   this.children.chatWindow.setProps({
  //     ...oldProps,
  //     currentChat: newProps.currentChat,
  //   });
  //   return true;
  // }

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

// 1 {{> Input label="Поиск" class="messengerPage__search"}}
