import Block from '../../modules/block';
import { ChatMessage } from '../../components';

type CurrentChatProps = {
  currentChat: {
    owner: boolean;
    message: string;
    time?: string;
  }[];
  messages?: ChatMessage[];
};

type CurrentChatChildlren = {
  messages: ChatMessage[];
};

export type TCurrentChatPropsKeys = keyof CurrentChatProps;

class CurrentChat extends Block<CurrentChatProps, Partial<CurrentChatChildlren>> {
  constructor(props: CurrentChatProps & CurrentChatChildlren) {
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

  componentDidUpdate(oldProps: CurrentChatProps, newProps: CurrentChatProps): boolean {
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
