import Block from '../../modules/block';
import { ChatMessage } from '../../components';

import type { ICurrentChatProps } from './currentChat.props.ts';

class CurrentChat extends Block<ICurrentChatProps> {
  constructor(props: ICurrentChatProps) {
    super({
      ...props,
      messages:
        props.currentChat.map((message) => {
          return new ChatMessage({
            owner: message.owner,
            message: message.message,
            time: message.time,
          });
        }) || [],
    });
  }

  componentDidUpdate(oldProps, newProps): boolean {
    for (const propKey in newProps) {
      if (oldProps[propKey] !== newProps[propKey]) {
        this.children.messages =
          this.props.currentChat.map((message) => {
            return new ChatMessage({
              owner: message.owner,
              message: message.message,
              time: message.time,
            });
          }) || [];
        return true;
      }
    }
    return false;
  }

  render() {
    return `
      <div class="chatWindow__chat messagesList">
        {{#if messages}}
          {{#each messages}}
            {{{ this }}}
          {{/each}}
        {{else}}
          <span>Выберите чат чтобы отправить сообщение</span>
        {{/if}}
      <div>
    `;
  }
}

export default CurrentChat;
