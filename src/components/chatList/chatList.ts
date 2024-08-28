import Block from '../../modules/block';
import { Input, Button, Link, ChatElement } from '../../components';

class ChatList extends Block<object> {
  init() {
    const test = new ChatElement({
      name: 'Андрей',
      lastMessage: 'стикер',
      img: 'src/assets/img/1.png',
      ownMessage: false,
      date: '10:49',
      unreadCounter: 15,
    });
    const chats = [
      new ChatElement({
        name: 'Андрей',
        lastMessage: 'стикер',
        img: 'src/assets/img/1.png',
        ownMessage: false,
        date: '10:49',
        unreadCounter: 15,
      }),
      new ChatElement({
        name: 'Ревьюверы',
        lastMessage: 'Я тут подумал что 20 часов в неделю кажется мало для всего этого...',
        img: 'src/assets/img/2.png',
        ownMessage: true,
        date: 'Ср',
        select: true,
      }),
      new ChatElement({
        name: 'Паприка',
        lastMessage: 'ясно, а потом очень длинное сообщение которое уходит в 3 точки 123 123 123 12 3123123',
        img: 'src/assets/img/3.png',
        ownMessage: false,
        date: '5 мая 2021',
        unreadCounter: 6,
      }),
    ];

    this.children = {
      ...this.children,
      // chats,
      test,
    };
  }

  render() {
    console.log(this.children.chats);
    return `
      <ul class="messengerPage__chatList">
      {{{ test }}}
        {{#each chats}}
          {{{ this }}}
        {{/each}}
      </ul>
    `;
  }
}

export default ChatList;
