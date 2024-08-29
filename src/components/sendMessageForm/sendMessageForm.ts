import Block from '../../modules/block.ts';
import { Input, Button } from '../../components';

class SendMessageForm extends Block<object> {
  messageRegex = /^(?!\s*$).+/;
  message = '';

  init() {
    const onChangeInputBind = this.onChangeInput.bind(this);
    const onSubmitButtonBind = this.onSubmitButton.bind(this);

    const messageInput = new Input({
      name: 'message',
      label: 'Введите сообщение',
      dataName: 'message',
      labelClass: 'messageSection__message',
      onChange: onChangeInputBind,
    });

    const SendMessageButton = new Button({
      label: '',
      type: 'primary',
      className: 'messageSection__submit',
      submit: onSubmitButtonBind,
    });

    this.children = {
      ...this.children,
      messageInput,
      SendMessageButton,
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
      console.log('Отправка сообщения', this.message);
    }
  }

  render() {
    return `
      <form>
        {{{ messageInput }}}
        {{{ SendMessageButton }}}
      </form>
    `;
  }
}

export default SendMessageForm;
