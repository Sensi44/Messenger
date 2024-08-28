import Block from '../../modules/block';
import { ChatElement } from '../../components';
import { chatListContext } from './chatListContext.ts';

class ChatList extends Block<object> {
  switchChatBind: (e: MouseEvent) => void;
  constructor(props: object) {
    super({
      ...props,
      chats: chatListContext.map((chat) => {
        return new ChatElement({
          select: chat.select || false,
          name: chat.name,
          lastMessage: chat.lastMessage || '',
          img: chat.img,
          ownMessage: chat.ownMessage || false,
          date: chat.date,
          unreadCounter: chat.unreadCounter || 0,
        });
      }),
    });

    this.switchChatBind = this.switchChat.bind(this);
  }

  init() {
    const switchChatBind = this.switchChat.bind(this);
    this.children = {
      ...this.children,
    };

    if (Array.isArray(this.children.chats)) {
      this.children.chats.map((chat) => {
        chat.setProps({
          ...chat.props,
          events: {
            click: switchChatBind,
          },
        });
      });
    }
  }

  switchChat(e: MouseEvent) {
    console.log('!', e.target);
  }

  render() {
    console.log(this.children);
    return `
      <ul class="messengerPage__chatList">
        {{#each chats}}
          {{{ this }}}
        {{/each}}
      </ul>
    `;
  }
}

export default ChatList;
