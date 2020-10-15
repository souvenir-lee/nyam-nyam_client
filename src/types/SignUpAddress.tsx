export type PickedAddressObject = {
  id: string;
  address_name: string;
  place_name: string;
  coord: {
    x: string;
    y: string;
  };
};

export type Coords = {
  x: number;
  y: number;
};
