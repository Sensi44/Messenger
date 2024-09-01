import { ChatWindowNav } from '../chatWindowNav';
import { CurrentChat } from '../currentChat';
import { SendMessageForm } from '../sendMessageForm';

type chat = {
  owner: boolean;
  message: string;
};

export type TChatWindowProps = {
  currentChat: chat[];
  openModal: (show: boolean, mode: boolean) => void;
  userData: {
    avatar: string;
    name: string;
  };
};

export type IChatWindowPropsKeys = keyof TChatWindowProps;

export type TChatWindowChildrens = {
  chatWindowNav: ChatWindowNav;
  currentChatMessages: CurrentChat;
  sendMessageForm: SendMessageForm;
};
