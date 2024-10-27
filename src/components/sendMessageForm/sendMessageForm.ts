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
    console.log('submit');
    e.preventDefault();
    const input = document.querySelector('input[name="message"]') as HTMLInputElement;
    console.log('input.value', input.value);
    const text = input.value;

    if (!this.messageRegex.test(this.message)) {
      console.log(`Потом сообщение просто будет не отправляться.
         Ошибку мы тоже не выводим у сообщения`);
    } else {
      sendMessage(text);
      console.log('Отправка сообщения:', this.message);
      input.value = '';
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
