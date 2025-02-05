import Block from '../../modules/block';
import { ChatElement } from '../../components';
import { getChats, getChatToken } from '../../services/Chats.ts';
import { formatLastMessageTime } from '../../utils/dateFormatter.ts';
import { webSocketConnect, getAllOldMessages } from '../../modules/webSocket.ts';

import type { TChat } from '../../modules/store/store.types.ts';

type TChatListProps = {
  chats?: TChat[];
  selectedChatId?: number | null;
};

type TChatListChildren = {
  chatItems: ChatElement[];
};

class ChatList extends Block<TChatListProps, Partial<TChatListChildren>> {
  constructor(props: TChatListProps & Partial<TChatListChildren>) {
    super({
      ...props,
    });
  }

  async componentDidMount() {
    getChats().catch((err) => {
      console.error(err);
    });
  }

  componentDidUpdate(oldProps: TChatListProps, newProps: TChatListProps): boolean {
    if (oldProps.chats?.length !== newProps.chats?.length || oldProps.selectedChatId !== newProps.selectedChatId) {
      const chatItems =
        newProps.chats?.map((chat: TChat) => {
          return new ChatElement({
            name: chat.title,
            lastMessage: chat.last_message ? chat.last_message.content : '',
            date: chat.last_message ? formatLastMessageTime(chat.last_message.time) : '',
            unreadCounter: chat.unread_count ? String(chat.unread_count) : '0',
            img: chat.last_message?.user.avatar
              ? `https://ya-praktikum.tech/api/v2/resources${chat.last_message?.user.avatar}`
              : 'src/assets/img/1.png',
            ownMessage: Boolean(chat.last_message),
            select: chat.id === newProps.selectedChatId,
            events: {
              click: () => this.onSelectCurrentChat(chat.id, chat.title),
            },
          });
        }) || [];

      this.children.chatItems = chatItems;
      this.setProps({ chatItems });

      return true;
    }
    return false;
  }

  async onSelectCurrentChat(id: number, title: string) {
    window.store.set({ chatTitle: title });
    window.store.set({ selectedChatId: id });

    const token = await getChatToken(id);
    window.store.set({ wsToken: token });
    console.log(token);
    await webSocketConnect();
    getAllOldMessages();
  }

  render() {
    return `
      <ul class="messengerPage__chatList">
        {{#each chatItems}}
          {{{ this }}}
        {{/each}}
      </ul>
    `;
  }
}

export default ChatList;
