import Block, { BlockProps } from '../../modules/block';
import { ChatMessage } from '../../components';

import type { TCurrentChatPropsKeys } from './currentChat.props.ts';
import type { IChatMessage } from '../chatMessage/ChatMessage.props.ts';

class CurrentChat extends Block {
  constructor(props: BlockProps<unknown>) {
    super({
      ...props,
      events: {},
      messages:
        (props.currentChat as []).map((message: IChatMessage) => {
          return new ChatMessage({
            owner: message.owner,
            message: message.message,
            time: message.time,
          });
        }) || [],
    });
  }

  componentDidUpdate(oldProps: BlockProps<unknown>, newProps: BlockProps<unknown>): boolean {
    for (const propKey in newProps) {
      const key = propKey as TCurrentChatPropsKeys;

      if (oldProps[key] !== newProps[key]) {
        this.children.messages =
          (this.props.currentChat as []).map((message: IChatMessage) => {
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
