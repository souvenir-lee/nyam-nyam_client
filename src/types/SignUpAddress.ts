import { AxiosError } from 'axios';
import { AddressObject } from './kakaomap';
import { AsyncState } from './utils';
import { Coords } from './defaultTypes';

export type PickedAddressObject = {
  id: string;
  address_name: string;
  place_name: string;
  coord: Coords;
};

export type SignUpState = {
  address: AsyncState<AddressObject[], AxiosError | null>;
  picked_address: AsyncState<
    {
      [key: string]: PickedAddressObject;
    },
    AxiosError | null
  >;
  coords: Coords | null;
};
