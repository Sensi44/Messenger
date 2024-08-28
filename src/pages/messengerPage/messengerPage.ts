import Block from '../../modules/block';
import { ChatWindow, ChatList, Input, Link } from '../../components';

class MessengerPage extends Block<object> {
  init() {
    const chatWindow = new ChatWindow({ test: 'a' });
    const profileLink = new Link({ url: 'profilePage', text: 'Профиль', class: 's' });
    const searchInput = new Input({
      name: 'search',
      label: 'Поиск',
      labelClass: 'messengerPage__search',
    });
    const chatList = new ChatList({});

    this.children = {
      ...this.children,
      profileLink,
      searchInput,
      chatList,
      chatWindow,
    };
  }

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
      </main>
    `;
  }
}

export default MessengerPage;

// 1 {{> Input label="Поиск" class="messengerPage__search"}}
