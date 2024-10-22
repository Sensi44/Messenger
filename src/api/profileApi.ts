import { HTTPTransport } from '../modules/xhr/httpMain.ts';

import type { TChangeUserDataRequest, TChangeUserPassword } from './type.ts';

export default class ProfileApi extends HTTPTransport {
  static async changeProfile(values: TChangeUserDataRequest) {
    return this.put('/user/profile', { data: values });
  }

  static async changePassword(values: TChangeUserPassword) {
    return this.put('/user/password', { data: values });
  }

  static async changeAvatar() {
    return this.put('/auth/signup');
  }
}
