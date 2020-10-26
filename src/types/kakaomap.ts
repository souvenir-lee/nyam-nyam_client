import { Coords } from './defaultTypes';

export type AddressObject = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

export type AddressAPIProps = { keyword: string; coords: Coords | null };
export type AddressAPIResult = AddressObject[];
