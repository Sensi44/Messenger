import Block from '../../modules/block';
// import { Input, Button, Link } from '../../components';

class MessengerPage extends Block<object> {
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
      </main>
    `;
  }
}

export default MessengerPage;

//1{{> Input label="Поиск" class="messengerPage__search"}}
