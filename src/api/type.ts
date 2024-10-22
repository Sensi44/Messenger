export type TLoginRequestData = {
  login: string;
  password: string;
};

export type TAPIError = {
  reason: string;
};

export type TUserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type TCreateRequestData = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  rePassword: string;
};
