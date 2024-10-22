import type { TUser } from '../../types/commonTypes.ts';

export interface StoreState {
  isLoading: boolean;
  error: string | null;
  me: [];
  isAuthorized: boolean | null;
  user: TUser | null;
  // chats: Array<ChatType>; // Укажите тип для ваших чатов
  // user: Array<UserType>; // Укажите тип для пользователя
  // selectedCard: CardType | null; // Укажите тип для карточки, если необходимо
}
