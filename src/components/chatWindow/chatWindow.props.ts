import { ChatWindowNav } from '../chatWindowNav';
import { CurrentChat } from '../currentChat';
import { SendMessageForm } from '../sendMessageForm';
import { TUser } from '../../types/commonTypes.ts';

type chat = {
  owner: boolean;
  message: string;
};

export type TChatWindowProps = {
  currentChat: chat[];
  selectedChatId: number;
  openModal: (show: boolean, mode: boolean) => void;
  userData: {
    avatar: string;
    name: string;
  };
  user: TUser;
};

export type IChatWindowPropsKeys = keyof TChatWindowProps;

export type TChatWindowChildrens = {
  chatWindowNav: ChatWindowNav;
  currentChatMessages: CurrentChat;
  sendMessageForm: SendMessageForm;
};
