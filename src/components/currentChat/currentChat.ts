import Block from '../../modules/block';
import { ChatMessage } from '../../components';
import { connect } from '../../modules/store/connect.ts';
import isEqual from '../../utils/isEqual.ts';

import type { StoreState } from '../../modules/store/store.types.ts';
import type { TMessage } from '../../types/commonTypes.ts';

type CurrentChatProps = {
  selectedChatId?: number;
  userId?: number;
  messages: TMessage[];
  isEmpty: boolean;
};

type CurrentChatChildlren = {
  messagesComponents: ChatMessage[];
};

class CurrentChat extends Block<CurrentChatProps, Partial<CurrentChatChildlren>> {
  componentDidUpdate(oldProps: CurrentChatProps, newProps: Partial<CurrentChatProps>): boolean {
    if (!isEqual(oldProps, newProps)) {
      const chatMessages = newProps.messages?.map((m: TMessage) => {
        return new ChatMessage({
          message: m.content,
          owner: m.user_id === this.props.userId,
          time: m.time,
        });
      });

      this.children.messagesComponents = chatMessages;

      return true;
    }

    return false;
  }

  render() {
    return `
      <div class="chatWindow__chat messagesList">
        {{#if messagesComponents}}
          {{#each messagesComponents}}
            {{{ this }}}
          {{/each}}
        {{else}}
            
        {{#if isEmpty}}
        <span>Сообщений нет</span>
        {{else}}
        <span>Выберите чат чтобы отправить сообщение</span>
        {{/if}}
          
        {{/if}}
      <div>
    `;
  }
}

const mapStateToProps = (state: StoreState) => ({
  selectedChatId: state.selectedChatId,
  userId: state.user?.id,
  messages: state.messages,
  isEmpty: state.selectedChatId !== 0,
});

export default connect(mapStateToProps)(CurrentChat);
