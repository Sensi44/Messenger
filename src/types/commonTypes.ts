export type SomeObject = Record<PropertyKey, any>;

type Nullable<T> = T | null;

export type Message = {
  id: number;
  user_id: number;
  chat_id?: number;
  type: string;
  content: string;
  file?: null | File;
  is_read?: boolean;
  time: string;
};

export type ChatsResponse = {
  token?: string;
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: Message;
};

export type UserInfo = {
  first_name: string;
  second_name: string;
  display_name: string;
  id: number;
  login: string;
  email: string;
  avatar: string;
  role: string;
  phone: string;
};

export type TUser = {
  id: number;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  avatar: string;
  phone: string;
  email: string;
  [key: string]: string | number | undefined; // Индексная сигнатура
};

type LastMessage = {
  user: TUser;
  time: string;
  content: string;
};

export type Chat = {
  id: number;
  title: string;
  avatar: Nullable<string>;
  unreadCount: number;
  lastMessage: LastMessage | null;
};
