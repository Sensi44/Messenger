import AuthApi from '../api/authApi.ts';
import { TLoginRequestData, TCreateRequestData } from '../api/type.ts';

import { apiHasError } from '../utils/apiHasError';
import { transformUser } from '../utils/apiTransformers';
import { trim } from '../utils/trim.ts';

export const getUser = async () => {
  const resUser = await AuthApi.me();
  if (apiHasError(resUser.response)) {
    window.store.set({ isLoading: false });
    throw Error(resUser.response.reason);
  }

  const transformedUser = transformUser(resUser.response);
  window.store.set({ user: transformedUser, isAuthorized: true });
};

export const login = async (data: TLoginRequestData) => {
  data.login = trim(data.login);
  data.password = trim(data.password);
  window.store.set({ isLoading: true });
  const res = await AuthApi.login(data);

  if (apiHasError(res.response)) {
    window.store.set({ error: res.response.reason });
    window.store.set({ isLoading: false });
    throw Error(res.response.reason);
  }

  await getUser();
  window.store.set({ isLoading: false });
  window.router.go('/messenger');
};

export const logout = async (): Promise<void> => {
  await AuthApi.logout().then((res) => {
    if (res.status === 200) {
      window.router.go('/');
      window.store.set({ isAuthorized: null });
    }
  });
};

export const create = async (data: TCreateRequestData): Promise<void> => {
  const res = await AuthApi.create(data);

  if (apiHasError(res.response)) {
    window.store.set({ error: res.response.reason });
    window.store.set({ isLoading: false });
    throw Error(res.response.reason);
  }

  window.router.go('/');
};
