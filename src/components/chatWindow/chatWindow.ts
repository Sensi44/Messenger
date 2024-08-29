import Block from '../../modules/block.ts';
import { SendMessageForm } from '../../components';

class ChatWindow extends Block<object> {
  // componentDidUpdate(oldProps, newProps): boolean {
  //   console.log(oldProps, newProps);
  //   return true;
  // }

  init() {
    const sendMessageForm = new SendMessageForm({});

    this.children = {
      ...this.children,
      sendMessageForm,
    };
  }

  render() {
    // console.log('render ChatWindow', this.props);
    return `
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
          
          <div class="chatWindow__chat">{{currentChat}}</div>
          
          <div class="chatWindow__messageSection messageSection">
            <button class="messengerPage__clip"><img src="src/assets/img/paperclip.svg" alt="1" /></button>
            {{{ sendMessageForm }}}
          </div>
        </article>
    `;
  }
}

export default ChatWindow;

// 2 {{> Input label="Сообщение" labelClass="chatWindow__messageInput" class="br" name="message"}}
//               {{> Button label="->" type="send" }}
