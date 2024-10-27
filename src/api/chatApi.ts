import { HTTPTransport } from '../modules/xhr/httpMain.ts';
// import { TCreateRequestData, TLoginRequestData } from './type.ts';
// import { TLoginRequestData, TCreateRequestData } from './type.ts';

export default class ChatApi extends HTTPTransport {
  static async createChat(data: string) {
    return this.post('/chats', { data: { title: data } });
  }

  static async getChats() {
    return this.get('/chats');
  }

  static async getChatToken(chatId: number) {
    return this.post(`/chats/token/${chatId}`);
  }

  static async addUsersToChat(users: number[], chatId: number) {
    return this.put('/chats2/users', {
      data: {
        users,
        chatId,
      },
    });
  }

  static async deleteUserFromChat(users: number[], chatId: number) {
    return this.delete('/chats/users', {
      data: {
        users,
        chatId,
      },
    });
  }
}
