import { ChatMessage } from '../chatMessage';

export interface ICurrentChatProps {
  currentChat: {
    owner: boolean;
    message: string;
  }[];
  messages?: ChatMessage[];
}
