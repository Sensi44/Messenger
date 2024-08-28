import Block from '../../modules/block';
import { ChatWindow } from '../../components';

class MessengerPage extends Block<object> {
  init() {
    const chatWindow = new ChatWindow({ test: 'a' });

    this.children = {
      ...this.children,
      chatWindow,
    };
  }

  render() {
    return `
      <main class="messengerPage basePage">
        <nav class="messengerPage__aside chatList">
          <div class="chatList__header">
            <a href="#" data-page="profile">Профиль ></a>
            <span>1</span>
          </div>
          <div>компонент со списком чатов</div>
        </nav>
       
       {{{ chatWindow }}}
      </main>
    `;
  }
}

export default MessengerPage;

// 1 {{> Input label="Поиск" class="messengerPage__search"}}
