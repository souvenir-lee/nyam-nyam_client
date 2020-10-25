import { AxiosError } from 'axios';
import { AddressObject } from './api';
import { PickedAddressObject, Coords } from './SignUpAddress';
import { AsyncState } from './utils';

export type SigninInfo = {
  email: string;
  password: string;
};

export type SigninUserData = {
  id: number | string;
  email: string | null;
  nickname: string | null;
  userImg: any;
  social: boolean | null;
} | null;

export type SigninSuccess = {
  message: string;
  user: SigninUserData;
};

export type SigninResponse = SigninSuccess | string;

export type SigninState = {
  isSignin: boolean;
  userdata: SigninUserData;
  loading: boolean;
  error: string | null;
};

export type InputField = {
  input: string | '';
  errMsg: string | null;
};

export type UserFields = {
  email: string;
  password: string;
  username: string;
};

export type SignupInfo = {
  email: string;
  password: string;
  userName: string;
  storeName: string;
  storeAddress: string;
  latitude: number;
  longitude: number;
};

export type SignupState = {
  userFields: UserFields;
  isEmailValid: boolean;
  loading: boolean;
  errMsg: string | null;
  address: AsyncState<AddressObject[], AxiosError>;
  picked_address: AsyncState<
    {
      [key: string]: PickedAddressObject;
    },
    AxiosError
  >;
  coords: Coords | null;
  signupInfo: SignupInfo | null;
};
