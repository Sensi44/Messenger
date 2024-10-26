import type { TUser } from '../../types/commonTypes.ts';

export type TChat = {
  avatar: string | null;
  created_by: number;
  id: number;
  title: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
};

export interface StoreState {
  isLoading: boolean;
  error: string | null;
  me: [];
  isAuthorized: boolean | null;
  user: TUser | null;
  chats: TChat[];
  selectedChatId: number;
  chatTitle: string;
  // chats: Array<ChatType>; // Укажите тип для ваших чатов
  // user: Array<UserType>; // Укажите тип для пользователя
  // selectedCard: CardType | null; // Укажите тип для карточки, если необходимо
}
