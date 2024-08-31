import Block, { BlockProps } from '../../modules/block.ts';
import { SendMessageForm, CurrentChat, ChatWindowNav, Input } from '../../components';

import type { IChatWindowPropsKeys } from './chatWindow.props.ts';

class ChatWindow extends Block {
  init() {
    const userData = this.props.userData as { name: string; avatar: string };

    const chatWindowNav = new ChatWindowNav({
      name: userData.name,
      avatar: userData.avatar,
      isOpen: false,
      openModal: this.props.openModal,
      events: {},
    });
    const currentChatMessages = new CurrentChat({ currentChat: [] });
    const sendMessageForm = new SendMessageForm({});

    this.children = {
      ...this.children,
      chatWindowNav,
      currentChatMessages,
      sendMessageForm,
    };
  }

  componentDidUpdate(oldProps: BlockProps<unknown>, newProps: BlockProps<unknown>): boolean {
    const { currentChat } = newProps;
    const userData = this.props.userData as { name: string; avatar: string };
    for (const propKey in newProps) {
      const key = propKey as IChatWindowPropsKeys;

      if (oldProps[key] !== newProps[key]) {
        (this.children.currentChatMessages as Input).setProps({
          ...(this.children.currentChatMessages as CurrentChat).props,
          currentChat,
          events: {},
        });

        (this.children.chatWindowNav as Input).setProps({
          ...(this.children.chatWindowNav as ChatWindowNav).props,
          name: userData.name,
          avatar: userData.avatar,
          events: {},
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
