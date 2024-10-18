import { HTTPTransport } from '../modules/xhr/httpMain.ts';
import { TLoginRequestData } from './type.ts';

export default class AuthApi extends HTTPTransport {
  static async login(values: TLoginRequestData) {
    return this.post('/auth/signin', { data: values });
  }

  static async me(): Promise<XMLHttpRequest> {
    return this.get('/auth/user');
  }

  // async create(data): Promise {
  //   return authApi.post('/auth/signup', { data });
  // }

  // async login(data: TLoginRequestData) {
  //   // return authApi.post('/signin', {data});
  //   // return await delay(data.login === 'httperror');
  // }

  //   static async create(values: ICreateUser) {
  //     const res = await this.post('/auth/signup', { data: values });
  //     return this.checkResponse(res);
  //   }

  // async me(): Promise {
  //   return authApi.get('/auth/user');
  // }
  //
  // async logout() {
  //   return authApi.post('/auth/logout');
  // }
}
