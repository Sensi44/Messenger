import Block from '../../modules/block.ts';
import { SendMessageForm, CurrentChat, ChatWindowNav } from '../../components';
import { connect } from '../../modules/store/connect.ts';

import type { TChatWindowProps, TChatWindowChildrens, IChatWindowPropsKeys } from './chatWindow.props.ts';
import type { StoreState } from '../../modules/store/store.types.ts';

class ChatWindow extends Block<TChatWindowProps, Partial<TChatWindowChildrens>> {
  init() {
    const chatWindowNav = new ChatWindowNav({
      name: this.props.userData.name,
      avatar: this.props.userData.avatar,
      isOpen: false,
      openModal: this.props.openModal,
    });
    const currentChatMessages = new CurrentChat({
      currentChat: [],
      messages: [],
    });
    const sendMessageForm = new SendMessageForm({});

    this.children = {
      ...this.children,
      chatWindowNav,
      currentChatMessages,
      sendMessageForm,
    };
  }

  componentDidUpdate(oldProps: TChatWindowProps, newProps: TChatWindowProps): boolean {
    const { currentChat } = newProps;

    for (const propKey in newProps) {
      const key = propKey as IChatWindowPropsKeys;

      if (oldProps[key] !== newProps[key]) {
        this.children.currentChatMessages?.setProps({
          ...this.children.currentChatMessages.props,
          currentChat,
        });

        this.children.chatWindowNav?.setProps({
          ...this.children.chatWindowNav.props,
          name: this.props.userData.name,
          avatar: this.props.userData.avatar,
        });

        return true;
      }
    }
    return false;
    // return true;
  }

  render() {
    // console.log('chatWindow', this.props);
    return `
      <article class="messengerPage__chatWindow chatWindow">
          <span class="chatWindow__developmentInfo">
          Текущий выбранный чат - ID: {{selectedChatId}} 
          | Имя чата - "{{chatTitle}}" 
          | Имя пользователя: "{{user.firstName}}" 
          </span>
      
          {{{ chatWindowNav }}}
          
          {{{ currentChatMessages }}}
          
          <div class="chatWindow__messageSection messageSection">
            {{{ sendMessageForm }}}
          </div>
      </article>
    `;
  }
}

const mapStateToProps = (state: StoreState) => ({
  isLoading: state.isLoading,
  selectedChatId: state.selectedChatId,
  chatTitle: state.chatTitle,
  error: state.error,
  user: state.user,
  chats: state.chats,
  isOpen: false,
});

export default connect(mapStateToProps)(ChatWindow);
