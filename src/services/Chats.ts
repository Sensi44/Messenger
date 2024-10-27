import ChatApi from '../api/chatApi.ts';
import ProfileApi from '../api/profileApi.ts';

import type { TSearchUserResponse } from '../types/commonTypes.ts';

import { apiHasError } from '../utils/apiHasError';
// import { transformUser } from '../utils/apiTransformers';
// import { trim } from '../utils/trim.ts';

export const createChat = async (data: string) => {
  const res = await ChatApi.createChat(data);

  if (apiHasError(res.response)) {
    throw Error(res.response.reason);
  }

  console.log('Чат создан успешно', res);
  alert('чат создан успешно');
  await getChats();
};

export const getChats = async () => {
  const res = await ChatApi.getChats();

  if (apiHasError(res.response)) {
    throw Error(res.response.reason);
  }

  window.store.set({ chats: res.response });
};

export const getChatToken = async (chatId: number) => {
  const res = await ChatApi.getChatToken(chatId);

  if (apiHasError(res.response)) {
    throw Error(res.response.reason);
  }

  return res.response.token;
};

export const searchUser = async (login: string) => {
  const res = await ProfileApi.userSearch(login);

  if (apiHasError(res.response)) {
    throw Error(res.response.reason);
  }

  return res.response as TSearchUserResponse[];
};

export const addUsersToChat = async (users: number[], chatId: number) => {
  window.store.set({ isLoading: true });
  const res = await ChatApi.addUsersToChat(users, chatId);

  if (apiHasError(res.response)) {
    window.store.set({ isLoading: false });
    throw Error(res.response.reason);
  }

  window.store.set({ isLoading: false });
  console.log('Запрос добавление в чат юзеров', res);
  return res.response;
};

export const deleteUserFromChat = async (users: number[], chatId: number) => {
  window.store.set({ isLoading: true });
  const res = await ChatApi.deleteUserFromChat(users, chatId);

  if (apiHasError(res.response)) {
    window.store.set({ isLoading: false });
    throw Error(res.response.reason);
  }

  window.store.set({ isLoading: false });
  console.log('Запрос на удаление пользователя из чата', res);
  return res.response;
};
