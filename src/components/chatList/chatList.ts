import Block from '../../modules/block';
import { ChatElement } from '../../components';
import { chatListContext } from './chatListContext.ts';


class ChatList extends Block<object> {
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
  }

  init() {
    this.children = {
      ...this.children,
    };

    const chats = this.children.chats;
    if (Array.isArray(chats)) {
      setTimeout(() => {
        chats[0].setProps({
          name: 'АААА',
        });
      }, 1000);
    }
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
