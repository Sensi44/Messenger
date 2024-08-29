import Block from '../../modules/block';
import { ChatMessage } from '../../components';

import type { ICurrentChatProps } from './currentChat.props.ts';

class CurrentChat extends Block<ICurrentChatProps> {
  constructor(props: ICurrentChatProps) {
    super({
      ...props,
      messages:
        props.currentChat.map((message) => {
          console.log(message);
          return new ChatMessage({
            owner: message.owner,
            message: message.message,
          });
        }) || [],
    });

    this.children = {
      ...this.children,
    };
  }

  init() {
    // this.children = {
    //   ...this.children,
    // };
    // this.props = {
    //   ...this.props,
    // };
    console.log('init', this.children);
  }

  componentDidUpdate(oldProps, newProps): boolean {
    // console.log(oldProps);
    // console.log(newProps);
    console.log(this.children.messages);

    this.children.messages =
      this.props.currentChat.map((message) => {
        console.log(message);
        return new ChatMessage({
          owner: message.owner,
          message: message.message,
        });
      }) || [];


    // console.log(this.props.currentChat);

    // this.children.messages = newMessages;
    return true;
  }

  render() {
    // console.log(this.props, Array.isArray(this.props.currentChat));
    return `
      <div class="chatWindow__chat">
        {{#each messages}}
          {{{ this }}}
        {{/each}}
      <div>
    `;
  }
}

export default CurrentChat;
