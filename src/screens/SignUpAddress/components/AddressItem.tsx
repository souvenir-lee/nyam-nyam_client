import React, { useState } from 'react';
import styled, { css } from '@emotion/native';

import { AddressObject } from '@base/types/api';
import { PickedAddressObject } from '@base/types/SignUpAddress';

const AddressItemWrapper = styled.TouchableOpacity``;
const AddressItemName = styled.Text``;
const AddressItemLocation = styled.Text``;

type AddressItemProps = {
  data: AddressObject;
  setAddress: React.Dispatch<React.SetStateAction<PickedAddressObject[]>>;
};

function AddressItem({ data, setAddress }: AddressItemProps) {
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
    setAddress((address) => [...address, newAddress]);
  };

  return (
    <AddressItemWrapper onPress={handlePress}>
      <AddressItemName>{data.place_name}</AddressItemName>
      <AddressItemLocation>{data.address_name}</AddressItemLocation>
    </AddressItemWrapper>
  );
}

export default React.memo(AddressItem);
