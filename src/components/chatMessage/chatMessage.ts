import Block from '../../modules/block';

import type { IChatMessage } from './ChatMessage.props.ts';

class ChatMessage extends Block<IChatMessage> {
  constructor(props: IChatMessage) {
    super(props);
  }

  render() {
    return `
        <li class="messagesList__message {{#if owner}}messagesList__message-owner{{/if}}">
          {{message}}
           <time>{{time}}</time>
        </li>
    `;
  }
}

export default ChatMessage;
