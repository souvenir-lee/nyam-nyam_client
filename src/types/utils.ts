import { AxiosError } from 'axios';
import { AddressObject } from './api';
import { PickedAddressObject, Coords } from './SignUpAddress';

export type AsyncState<T, E = any> = {
  data: T;
  loading: boolean;
  error: E;
};

export type SignupState = {
  address: AsyncState<AddressObject[], AxiosError>;
  picked_address: AsyncState<
    {
      [key: string]: PickedAddressObject;
    },
    AxiosError
  >;
  coords: Coords | null;
};
