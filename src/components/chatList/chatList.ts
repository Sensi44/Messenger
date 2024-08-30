import Block, { BlockProps } from '../../modules/block';
import { ChatElement } from '../../components';

import type { ChatElementProps } from '../chatElement/chatElement.props.ts';

class ChatList extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      chatsList:
        props.chats.map((chat: ChatElementProps) => {
          return new ChatElement({
            select: chat.select || false,
            name: chat.name,
            lastMessage: chat.lastMessage || '',
            img: chat.img,
            ownMessage: chat.ownMessage || false,
            date: chat.date,
            unreadCounter: chat.unreadCounter || 0,
          });
        }) || [],
    });
  }

  init() {
    const switchChatBind = this.switchChat.bind(this);
    this.children = {
      ...this.children,
    };

    if (Array.isArray(this.children.chatsList)) {
      this.children.chatsList.map((chat) => {
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
    const clickedChatElement = e.currentTarget;
    let clickedChatIndex: number;
    if (Array.isArray(this.children.chatsList)) {
      clickedChatIndex = this.children.chatsList.findIndex((chat) => chat.getContent() === clickedChatElement);

      if (clickedChatIndex >= 0) {
        this.children.chatsList.forEach((chat, index) => {
          chat.setProps({
            select: index === clickedChatIndex,
          });
        });
      }

      this.props.updateFunc(clickedChatIndex);
    }
  }

  render() {
    return `
      <ul class="messengerPage__chatList">
        {{#each chatsList}}
          {{{ this }}}
        {{/each}}
      </ul>
    `;
  }
}

export default ChatList;
