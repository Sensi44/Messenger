export interface StoreState {
  isLoading: boolean;
  loginError: string | null;
  me: [];
  user: any;
  // chats: Array<ChatType>; // Укажите тип для ваших чатов
  // user: Array<UserType>; // Укажите тип для пользователя
  // selectedCard: CardType | null; // Укажите тип для карточки, если необходимо
}
