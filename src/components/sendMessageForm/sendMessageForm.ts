import Block from '../../modules/block.ts';
import { Input, Button } from '../../components';

class SendMessageForm extends Block<object> {
  messageRegex = /^(?!\s*$).+/;
  message = '';

  init() {
    const onChangeInputBind = this.onChangeInput.bind(this);
    const onSubmitButtonBind = this.onSubmitButton.bind(this);

    const paperclipButton = new Button({
      label: '',
      type: 'primary',
      className: 'messageSection__paperclip',
    });

    const messageInput = new Input({
      name: 'message',
      label: 'Сообщение',
      dataName: 'message',
      labelClass: 'messageSection__message',
      onChange: onChangeInputBind,
    });

    const sendMessageButton = new Button({
      label: '',
      type: 'primary',
      className: 'messageSection__submit',
      submit: onSubmitButtonBind,
    });

    this.children = {
      ...this.children,
      paperclipButton,
      messageInput,
      sendMessageButton,
    };
  }

  onChangeInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    this.message = input.value;
  }

  onSubmitButton(e: MouseEvent) {
    e.preventDefault();

    if (!this.messageRegex.test(this.message)) {
      alert(
        `Потом сообщение просто будет не отправляться.
         Ошибку мы тоже не выводим у сообщения,
         поэтому пока что алерт для ревью`
      );
    } else {
      console.log('Отправка сообщения:', this.message);
    }
  }

  render() {
    return `
      <form>
        {{{ paperclipButton }}}
        {{{ messageInput }}}
        {{{sendMessageButton }}}
      </form>
    `;
  }
}

export default SendMessageForm;

