import Block from '../../modules/block';
import { ChatMessage } from '../../components';

import type { ICurrentChatProps, TCurrentChatPropsKeys } from './currentChat.props.ts';

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

  componentDidUpdate(oldProps: ICurrentChatProps, newProps: ICurrentChatProps): boolean {
    for (const propKey in newProps) {
      const key = propKey as TCurrentChatPropsKeys;

      if (oldProps[key] !== newProps[key]) {
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

