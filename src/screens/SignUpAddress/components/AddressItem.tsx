import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';

import { AddressObject } from '@base/types/api';
import { PickedAddressObject } from '@base/types/SignUpAddress';
import { addAddress } from '@base/modules/signup';

const AddressItemWrapper = styled.TouchableOpacity``;
const AddressItemName = styled.Text``;
const AddressItemLocation = styled.Text``;

type AddressItemProps = {
  data: AddressObject;
};

function AddressItem({ data }: AddressItemProps) {
  const dispatch = useDispatch();

  const handlePress = () => {
    const newAddress = {
      id: data.id,
      address_name: data.address_name,
      place_name: data.place_name,
      coord: {
        x: data.x,
        y: data.y,
      },
    };
    dispatch(addAddress(newAddress));
  };

  return (
    <AddressItemWrapper onPress={handlePress}>
      <AddressItemName>{data.place_name}</AddressItemName>
      <AddressItemLocation>{data.address_name}</AddressItemLocation>
    </AddressItemWrapper>
  );
}

export default React.memo(AddressItem);
