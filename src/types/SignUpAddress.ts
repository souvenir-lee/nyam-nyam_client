import { AxiosError } from 'axios';
import { AddressObject } from './weather';
import { AsyncState } from './utils';
import { Coords } from '@base/types/defaultTypes';

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
