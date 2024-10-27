import Block from '../../modules/block.ts';
import { Input, Button } from '../../components';
import { sendMessage } from '../../modules/webSocket.ts';

type SendMessageFormProps = {};
type SendMessageFormChildren = {
  paperclipButton: Button;
  messageInput: Input;
  sendMessageButton: Button;
};

class SendMessageForm extends Block<SendMessageFormProps, SendMessageFormChildren> {
  messageRegex = /^(?!\s*$).+/;
  message = '';

  init() {
    const onChangeInputBind = this.onChangeInput.bind(this);
    const onSubmitButtonBind = this.onSubmitButton.bind(this);

    const paperclipButton = new Button({
      label: '',
      type: 'primary',
      className: 'messageSection__paperclip',
      submit: (e) => {
        e.preventDefault();
      },
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
      buttonType: 'submit',
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
    console.log('sad');
    e.preventDefault();

    if (!this.messageRegex.test(this.message)) {
      alert(
        `Потом сообщение просто будет не отправляться.
         Ошибку мы тоже не выводим у сообщения,
         поэтому пока что алерт для ревью`
      );
    } else {
      sendMessage(this.message);
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
