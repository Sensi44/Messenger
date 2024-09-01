import Block from '../../modules/block';
// import type { IChatMessage } from './ChatMessage.props.ts';

type TChatMessageProps = {
  message: string;
  owner: boolean;
  time?: string;
};
type TChatMessageChildren = {};

class ChatMessage extends Block<TChatMessageProps, TChatMessageChildren> {
  constructor(props: TChatMessageProps & TChatMessageChildren) {
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
