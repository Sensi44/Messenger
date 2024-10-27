import Block from '../../modules/block';
import { ChatMessage } from '../../components';
import { connect } from '../../modules/store/connect.ts';
import type { StoreState } from '../../modules/store/store.types.ts';
import isEqual from '../../utils/isEqual.ts';

type CurrentChatProps = {
  selectedChatId?: number;
  userId?: number;
  messages?: string[];
};

type CurrentChatChildlren = {
  messagesComponents: ChatMessage[];
};

export type TCurrentChatPropsKeys = keyof CurrentChatProps;

class CurrentChat extends Block<CurrentChatProps, Partial<CurrentChatChildlren>> {
  // constructor(props: CurrentChatProps & CurrentChatChildlren) {
  //   super({
  //     ...props,
  //     // messages:
  //     //   props.currentChat.map((message) => {
  //     //     return new ChatMessage({
  //     //       owner: message.owner,
  //     //       message: message.message,
  //     //       time: message.time,
  //     //     });
  //     //   }) || [],
  //   });
  // }

  // componentDidUpdate(oldProps: CurrentChatProps, newProps: CurrentChatProps): boolean {
  //   for (const propKey in newProps) {
  //     const key = propKey as TCurrentChatPropsKeys;
  //
  //     if (oldProps[key] !== newProps[key]) {
  //       this.children.messages =
  //         this.props.currentChat.map((message) => {
  //           return new ChatMessage({
  //             owner: message.owner,
  //             message: message.message,
  //             time: message.time,
  //           });
  //         }) || [];
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  componentDidUpdate(oldProps: CurrentChatProps, newProps: Partial<CurrentChatProps>): boolean {
    return !isEqual(oldProps, newProps);
  }

  render() {
    console.log('currentChat', this.props.messages);
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

const mapStateToProps = (state: StoreState) => ({
  selectedChatId: state.selectedChatId,
  userId: state.user?.id,
  messages: state.messages,
});

export default connect(mapStateToProps)(CurrentChat);
