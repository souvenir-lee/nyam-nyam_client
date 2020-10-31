import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';

import { AddressObject } from '@base/types/weather';
import { PickedAddressObject } from '@base/types/SignUpAddress';
import { addAddress } from '@base/modules/signup';
import { MINT, MINT_STRONG } from '@base/baseColors';

type AddressItemProps = {
  data: AddressObject;
};

function AddressItem({ data }: AddressItemProps) {
  const dispatch = useDispatch();

  const handlePress = () => {
    const newAddress: PickedAddressObject = {
      id: data.id,
      address_name: data.address_name,
      place_name: data.place_name,
      coord: {
        x: parseInt(data.x, 10),
        y: parseInt(data.y, 10),
      },
    };
    dispatch(addAddress(newAddress));
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
  color: ${MINT_STRONG};
`;
const AddressItemLocation = styled.Text`
  color: ${MINT_STRONG};
`;

export default React.memo(AddressItem);
