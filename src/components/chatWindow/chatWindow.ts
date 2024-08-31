import Block from '../../modules/block.ts';
import { SendMessageForm, CurrentChat, ChatWindowNav } from '../../components';

import type { TChatWindowProps, TChatWindowChildrens, IChatWindowPropsKeys } from './chatWindow.props.ts';

class ChatWindow extends Block<TChatWindowProps, Partial<TChatWindowChildrens>> {
  init() {
    const chatWindowNav = new ChatWindowNav({
      name: this.props.userData.name,
      avatar: this.props.userData.avatar,
      isOpen: false,
      openModal: this.props.openModal,
    });
    const currentChatMessages = new CurrentChat({ currentChat: [], messages: [] });
    const sendMessageForm = new SendMessageForm({});

    this.children = {
      ...this.children,
      chatWindowNav,
      currentChatMessages,
      sendMessageForm,
    };
  }

  componentDidUpdate(oldProps: TChatWindowProps, newProps: TChatWindowProps): boolean {
    const { currentChat } = newProps;

    for (const propKey in newProps) {
      const key = propKey as IChatWindowPropsKeys;

      if (oldProps[key] !== newProps[key]) {
        this.children.currentChatMessages?.setProps({
          ...this.children.currentChatMessages.props,
          currentChat,
        });

        this.children.chatWindowNav?.setProps({
          ...this.children.chatWindowNav.props,
          name: this.props.userData.name,
          avatar: this.props.userData.avatar,
        });

        return true;
      }
    }
    return false;
  }

  render() {
    return `
      <article class="messengerPage__chatWindow chatWindow">
          {{{ chatWindowNav }}}
          
          {{{ currentChatMessages }}}
          
          <div class="chatWindow__messageSection messageSection">
            {{{ sendMessageForm }}}
          </div>
      </article>
    `;
  }
}

export default ChatWindow;
