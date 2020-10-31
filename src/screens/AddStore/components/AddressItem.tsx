import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';

import { AddressObject } from '@base/types/weather';
import { PickedAddressObject } from '@base/types/SignUpAddress';
import { pickAddress } from '@base/modules/addStore';

type AddressItemProps = {
  data: AddressObject;
};

function AddressItem({ data }: AddressItemProps) {
  const dispatch = useDispatch();

  const handlePress = () => {
    const newAddress: PickedAddressObject = {
      storeAddress: data.address_name,
      storeName: data.place_name,
      latitude: parseInt(data.y, 10),
      longitude: parseInt(data.x, 10),
    };
    console.log('new address', newAddress);
    dispatch(pickAddress(newAddress));
  };

  return (
    <AddressItemOpacity onPress={handlePress}>
      <AddressItemName>{data.place_name}</AddressItemName>
      <AddressItemLocation>{data.address_name}</AddressItemLocation>
    </AddressItemOpacity>
  );
}

const AddressItemOpacity = styled.TouchableOpacity`
  padding: 7px 0px;
`;
const AddressItemName = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;
const AddressItemLocation = styled.Text``;

export default React.memo(AddressItem);
