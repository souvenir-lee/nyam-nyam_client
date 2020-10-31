import { AxiosError } from 'axios';
import { PickedAddressObject } from './SignUpAddress';
import { AddressObject } from './kakaomap';
import { Coords } from './defaultTypes';
import { AsyncState } from './utils';

export type SigninInfo = {
  email: string;
  password: string;
};

export type SigninUserData = {
  id: number | string;
  email: string;
  username: string;
  userImg: any;
  social: string | null;
} | null;

export type SigninStoreData = {
  id: number | string;
  storeName: string;
  storeAddress: string;
  latitude: number;
  longitude: number;
} | null;


export type SigninSuccess = {
  message: string;
  user: SigninUserData;
};

export type SigninResponse = SigninSuccess | string;

export type SigninState = {
  isSignin: boolean;
  service: 'customer' | 'store' | null;
  user: SigninUserData;
  store: any;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
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
  address: AsyncState<AddressObject[], AxiosError> | null;
  picked_address: AsyncState<
    {
      [key: string]: PickedAddressObject;
    },
    AxiosError
  > | null;
  coords: Coords | null;
  signupInfo: SignupInfo | null;
};
