import { HTTPTransport } from '../modules/xhr/httpTransport.ts';
// import { APIError, CreateUser, LoginRequestData, SignUpResponse, UserDTO } from './type';

const authApi = new HTTPTransport('/auth');

const delay = (showError) =>
  new Promise((resolve, reject) => {
    if (showError) {
      setTimeout(() => reject(), 2000);
    } else {
      setTimeout(() => resolve(), 3000);
    }
  });

export default class AuthApi {
  async create(data): Promise {
    return authApi.post('/signup', { data });
  }

  async login(data) {
    // return authApi.post('/signin', {data});
    return await delay(data.login === 'httperror');
  }

  async me(): Promise {
    return authApi.get('/user');
  }

  async logout() {
    return authApi.post('/logout');
  }
}
