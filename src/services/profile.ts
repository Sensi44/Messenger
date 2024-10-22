import ProfileApi from '../api/profileApi.ts';

import { getUser } from './auth.ts';
import { apiHasError } from '../utils/apiHasError';
import { trim } from '../utils/trim.ts';

import type { TChangeUserDataRequest, TChangeUserPassword } from '../api/type.ts';

export const changeProfileData = async (data: TChangeUserDataRequest) => {
  const trimmedData: TChangeUserDataRequest = {
    email: trim(data.email),
    login: trim(data.login),
    first_name: trim(data.first_name),
    second_name: trim(data.second_name),
    phone: trim(data.phone),
    display_name: trim(data.display_name),
  };

  window.store.set({ isLoading: true });
  const res = await ProfileApi.changeProfile(trimmedData);

  if (apiHasError(res.response)) {
    window.store.set({ isLoading: false });
    throw Error(res.response.reason);
  }

  window.store.set({ isLoading: false });
  window.router.go('/profile');
  await getUser();
};

export const changeProfilePassword = async (data: TChangeUserPassword) => {
  const trimmedData: TChangeUserPassword = {
    oldPassword: trim(data.oldPassword),
    newPassword: trim(data.newPassword),
  };

  window.store.set({ isLoading: true });
  const res = await ProfileApi.changePassword(trimmedData);

  if (apiHasError(res.response)) {
    window.store.set({ isLoading: false });
    throw Error(res.response.reason);
  }

  window.store.set({ isLoading: false });
  window.router.go('/profile');
};
