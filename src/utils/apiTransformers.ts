import type { TUserDTO } from '../api/type.ts';
import type { TUser } from '../types/commonTypes.ts';

export const transformUser = (data: TUserDTO): TUser => {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
};
