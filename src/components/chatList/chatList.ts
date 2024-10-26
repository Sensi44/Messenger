import Block from '../../modules/block';
import { ChatElement } from '../../components';
import { createChat, getChats } from '../../services/Chats.ts';

// import type { ChatElementProps } from '../chatElement/chatElement.props.ts';
import type { TChat } from '../../modules/store/store.types.ts';

type TChatListProps = {
  chats?: TChat[];
  electedChatId?: number | null;
  // chatsList?: ChatElement[];
  updateFunc: (a: number) => void;
};

type TChatListChildren = {
  // chatsList: ChatElement[];
  chatsList: any;
};

class ChatList extends Block<TChatListProps, Partial<TChatListChildren>> {
  constructor(props: TChatListProps & Partial<TChatListChildren>) {
    console.log('constructor');
    super({
      ...props,
      // chatsList:
      //   props.chats?.map((chat: TChat) => {
      //     return new ChatElement({
      //       select: false,
      //       name: chat.title,
      //       lastMessage: chat.last_message || '',
      //       img: chat.avatar || '/src/assets/img/1.png',
      //       ownMessage: Boolean(chat.last_message),
      //       date: chat.created_by,
      //       unreadCounter: chat.unread_count || 0,
      //     });
      //   }) || [],
    });
  }

  init() {
    console.log('init', this.props);
    const switchChatBind = this.switchChat.bind(this);
    const chatsList =
      this.props.chats?.map((chat: TChat) => {
        return new ChatElement({
          select: false,
          name: chat.title,
          lastMessage: chat.last_message || '',
          img: chat.avatar || '/src/assets/img/1.png',
          ownMessage: Boolean(chat.last_message),
          date: chat.created_by,
          unreadCounter: chat.unread_count || 0,
        });
      }) || [];

    this.children = {
      ...this.children,
      chatsList,
    };

    if (Array.isArray(this.children.chatsList)) {
      console.log(this.children.chatsList, '');
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

  async componentDidMount() {
    getChats();
  }

  componentDidUpdate(oldProps: TChatListProps, newProps: TChatListProps): boolean {
    console.log('oldPropsChatlist', oldProps);
    console.log('newPropsChatlist', newProps);
    if (oldProps.chats?.length !== newProps.chats?.length) {
      this.init();
      return true;
    }
    return false;
  }

  switchChat(e: MouseEvent) {
    console.log('switch');
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
    console.log(this.children.chatsList, 'this.children.chatsList');
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
