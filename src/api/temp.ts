// import { HTTPTransport } from '../modules/xhr/myFetch.ts';
// import { ICreateUser, ISignInUser, IUpdateUserAvatar, IUpdateUserInfo, IUpdateUserPassword } from '../types/user';
//
// export class UserAPI extends HTTPTransport {
//   static async create(values: ICreateUser) {
//     const res = await this.post('/auth/signup', { data: values });
//     return this.checkResponse(res);
//   }
//
//   static async updateInfo(values: IUpdateUserInfo) {
//     const res = await this.put('/user/profile', { data: values });
//     return this.checkResponse(res);
//   }
//
//   static async updatePassword(values: IUpdateUserPassword) {
//     const res = await this.put('/user/password', { data: values });
//     return this.checkResponse(res);
//   }
//
//   static async updateAvatar(value: IUpdateUserAvatar) {
//     const formData = new FormData();
//     formData.append('avatar', value.avatar);
//
//     const res = await this.put('/user/profile/avatar', { data: formData });
//     return this.checkResponse(res);
//   }
//
//   static async signIn(values: ISignInUser) {
//     const res = await this.post('/auth/signin', { data: values });
//     return this.checkResponse(res);
//   }
//
//   static async getInfo() {
//     const res = await this.get('/auth/user');
//     return this.checkResponse(res);
//   }
//
//   static async logOut() {
//     const res = await this.post('/auth/logout');
//     return this.checkResponse(res);
//   }
//
//   static async findByLogin(login: string) {
//     const res = await this.post('/user/search', { data: { login } });
//     return this.checkResponse(res);
//   }
// }
