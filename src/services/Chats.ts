import ChatApi from '../api/chatApi.ts';

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
