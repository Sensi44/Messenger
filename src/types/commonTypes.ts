export type SomeObject = Record<PropertyKey, any>;

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
