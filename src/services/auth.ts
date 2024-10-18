import AuthApi from '../api/authApi.ts';
import { TLoginRequestData } from '../api/type.ts';
import { apiHasError } from '../utils/apiHasError';
import { transformUser } from '../utils/apiTransformers';

const getUser = async () => {
  const resUser = await AuthApi.me();
  if (apiHasError(resUser.response)) {
    throw Error(resUser.response.reason);
  }

  return transformUser(resUser.response);
};

export const login = async (data: TLoginRequestData) => {
  const res = await AuthApi.login(data)

  if (apiHasError(res.response)) {
    window.store.set({ loginError: res.response.reason });
    throw Error(res.response.reason);
  }

  const me = await getUser();
  window.store.set({ user: me });
};
