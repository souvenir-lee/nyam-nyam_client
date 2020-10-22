import { AxiosError } from 'axios';
import { AddressObject } from './api';
import { PickedAddressObject, Coords } from './SignUpAddress';
import { AsyncState } from './utils';

export type SigninInfo = {
    email: string,
    password: string
};

export type SigninUserData = {
    id: number | string,
    email: string | null,
    nickname: string | null,
    userImg: any,
    social: boolean | null
} | null;

export type SigninSuccess = {
  message: string;
  user: SigninUserData;
}

export type SigninResponse = SigninSuccess | string;

export type SigninState = {
    isSignin: boolean;
    user : SigninUserData;
    error: string | null;
    accessToken: string | null;
};

export type InputField = {
  input: string | '';
  errMsg: string | null;
}

export type UserFields = {
  email: string;
  password: string;
  username: string;
};

export type SignupState = {
  userFields: UserFields;
  isEmailValid: boolean;
  errMsg: string | null;
  address: AsyncState<AddressObject[], AxiosError>;
  picked_address: AsyncState<
    {
      [key: string]: PickedAddressObject;
    },
    AxiosError
  >;
  coords: Coords | null;
};