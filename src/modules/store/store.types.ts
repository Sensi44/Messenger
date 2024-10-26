import type { TUser } from '../../types/commonTypes.ts';

export type TChat = {
  avatar: string | null;
  created_by: number;
  id: number;
  last_message: null | string;
  title: string;
  unread_count: number;
};

export interface StoreState {
  isLoading: boolean;
  error: string | null;
  me: [];
  isAuthorized: boolean | null;
  user: TUser | null;
  chats: TChat[];
  selectedChatId?: number | null;
  // chats: Array<ChatType>; // Укажите тип для ваших чатов
  // user: Array<UserType>; // Укажите тип для пользователя
  // selectedCard: CardType | null; // Укажите тип для карточки, если необходимо
}
