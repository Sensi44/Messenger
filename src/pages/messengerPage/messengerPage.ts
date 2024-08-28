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
        
        <article class="messengerPage__chatWindow chatWindow">
          <div class="chatWindow__navigate">
            <div class="chatWindow__companionProfile">
              <img src="src/assets/img/2.png" class="messengerPage__avatar" alt="1" />
              Имя пользователя
            </div>
            <div class="chatWindow__setting">
              <button class="chatWindow__settingsButton">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </button>
              <div class="chatWindow__settingsMenu">
                <a href="#" data-page="messengerWithModal">Добавить пользователя</a>
                <a href="#" data-page="messengerWithModal">Удалить пользователя</a>
              </div>
            </div>
          </div>
          
          <div class="chatWindow__chat">Окно сообщений</div>
          
          <div class="chatWindow__messageSection">
            <button class="messengerPage__clip"><img src="src/assets/img/3.png" alt="1" /></button>
            <form>
              <div>2 - форма ввода текста и кнопка отправить</div>
            </form>
          </div>
        </article>
      </main>
    `;
  }
}

export default MessengerPage;

// 1 {{> Input label="Поиск" class="messengerPage__search"}}
// 2 {{> Input label="Сообщение" labelClass="chatWindow__messageInput" class="br" name="message"}}
//               {{> Button label="->" type="send" }}
