import Block, { BlockProps } from '../../modules/block';

class ChatMessage extends Block {
  constructor(props: BlockProps) {
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
