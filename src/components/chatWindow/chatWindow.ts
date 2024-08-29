import Block from '../../modules/block.ts';
import { SendMessageForm, ChatWindowNav } from '../../components';

import type { IChatWindowProps } from './chatWindow.props.ts';

class ChatWindow extends Block<IChatWindowProps> {
  init() {
    const sendMessageForm = new SendMessageForm({});
    const chatWindowNav = new ChatWindowNav({
      name: this.props.userData.name,
      avatar: this.props.userData.avatar,
      isOpen: false,
      openModal: this.props.openModal,
    });

    this.children = {
      ...this.children,
      chatWindowNav,
      sendMessageForm,
    };
  }

  componentDidUpdate(oldProps, newProps): boolean {
    this.children.chatWindowNav.setProps({
      ...this.children.chatWindowNav.props,
      name: this.props.userData.name,
      avatar: this.props.userData.avatar,
    });
    return true;
  }

  render() {
    // console.log(this.props);
    return `
      <article class="messengerPage__chatWindow chatWindow">
          {{{ chatWindowNav }}}
          
          <div class="chatWindow__chat">{{currentChat}}</div>
          
          <div class="chatWindow__messageSection messageSection">
            {{{ sendMessageForm }}}
          </div>
      </article>
    `;
  }
}

export default ChatWindow;
