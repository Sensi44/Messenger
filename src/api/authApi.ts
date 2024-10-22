import { HTTPTransport } from '../modules/xhr/httpMain.ts';
import { TLoginRequestData, TCreateRequestData } from './type.ts';

export default class AuthApi extends HTTPTransport {
  static async login(values: TLoginRequestData) {
    return this.post('/auth/signin', { data: values });
  }

  static async me() {
    return this.get('/auth/user');
  }

  static async create(values: TCreateRequestData) {
    return this.post('/auth/signup', { data: values }); //todo допилить
  }

  static async logout() {
    return this.post('/auth/logout');
  }
}
