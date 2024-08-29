import { ChatMessage } from '../chatMessage';

export interface ICurrentChatProps {
  currentChat: {
    owner: boolean;
    message: string;
    time: string;
  }[];
  messages?: ChatMessage[];
}

export type TCurrentChatPropsKeys = keyof ICurrentChatProps;
